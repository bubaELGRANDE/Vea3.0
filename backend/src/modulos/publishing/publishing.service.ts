import { AppDataSource } from '../../core/confi/data-source';
import { Publishing } from '../../core/entity/Publishing';
import { PublishingDesc } from '../../core/entity/PublishingDesc';
import { PublishingCategories } from '../../core/entity/PublishingCategories';
import { Sellers } from '../../core/entity/Sellers';
import { Categories } from '../../core/entity/Categories';
import { ArticleStatus } from '../../core/entity/ArticleStatus';
import { Repository, In } from 'typeorm';
import { CreatePublishingDto } from './publishing.model';

export class PublishingService {
    private publishingRepository: Repository<Publishing>;
    private sellersRepository: Repository<Sellers>;
    private categoriesRepository: Repository<Categories>;
    private articleStatusRepository: Repository<ArticleStatus>;

    constructor() {
        this.publishingRepository = AppDataSource.getRepository(Publishing);
        this.sellersRepository = AppDataSource.getRepository(Sellers);
        this.categoriesRepository = AppDataSource.getRepository(Categories);
        this.articleStatusRepository = AppDataSource.getRepository(ArticleStatus);
    }

    async createPublication(publishingDto: CreatePublishingDto): Promise<Publishing> {
        const { title, description, price, articleStatusId, categoryIds, sku, sellerId, statusId } = publishingDto;

        return AppDataSource.manager.transaction(async transactionalEntityManager => {
            // 1. Validar vendedor
            const seller = await transactionalEntityManager.findOneBy(Sellers, { id: sellerId });
            if (!seller) {
                throw new Error('El vendedor especificado no fue encontrado.');
            }

            // 2. Validar estado del artículo
            const articleStatus = await transactionalEntityManager.findOneBy(ArticleStatus, { id: articleStatusId });
            if (!articleStatus) {
                throw new Error('El estado del artículo especificado no fue encontrado.');
            }

            // 3. Crear publicación
            const newPublishing = new Publishing();
            newPublishing.title = title;
            newPublishing.description = description;
            newPublishing.price = price;
            newPublishing.seller = seller;
            newPublishing.status = { id: statusId } as any;
            newPublishing.type = 1;

            const savedPublishing = await transactionalEntityManager.save(newPublishing);
            console.log('ID de la publicación guardada:', savedPublishing.id); // Log para depuración

            // 4. Crear descripción con SKU
            const newPublishingDesc = new PublishingDesc();
            newPublishingDesc.description = description;
            newPublishingDesc.sku = sku || `SKU-${savedPublishing.id}`;
            newPublishingDesc.publishing = savedPublishing;
            newPublishingDesc.articleStatus = articleStatus;

            await transactionalEntityManager.save(newPublishingDesc);

            // 5. Asociar categorías
            if (categoryIds && categoryIds.length > 0) {
                const categories = await transactionalEntityManager.findBy(Categories, { id: In(categoryIds) });
                if (categories.length !== categoryIds.length) {
                    throw new Error('Una o más categorías no fueron encontradas.');
                }

                const publishingCategories = categories.map(category => {
                    const pc = new PublishingCategories();
                    pc.publishing = savedPublishing;
                    pc.category = category;
                    return pc;
                });

                await transactionalEntityManager.save(publishingCategories);
            }

            // 6. Obtener publicación completa (con relaciones) dentro de la transacción
            const fullPublishing = await transactionalEntityManager.findOne(Publishing, {
                where: { id: savedPublishing.id },
                relations: [
                    'status',
                    'seller',
                    'seller.user',
                    'categories',
                    'categories.category',
                    'descriptions',
                    'descriptions.articleStatus',
                    'images'
                ]
            });

            if (!fullPublishing) {
                throw new Error('Error al obtener la publicación recién creada.');
            }

            return fullPublishing;
        });
    }

    async getAllPublishing(): Promise<Publishing[]> {
        return this.publishingRepository.find({
            relations: [
                'status',
                'categories',
                'categories.category',
                'descriptions',
                'descriptions.articleStatus'
            ],
            order: { id: 'DESC' }
        });
    }

    async getPublishingById(id: number): Promise<Publishing | null> {
        return this.publishingRepository.findOne({
            where: { id },
            relations: [
                'status',
                'seller',
                'seller.user',
                'categories',
                'categories.category',
                'descriptions',
                'descriptions.articleStatus',
                'images'
            ]
        });
    }

    async getPublishingBySeller(sellerId: number): Promise<Publishing[]> {
        return this.publishingRepository.find({
            where: { seller: { id: sellerId } },
            relations: ['status', 'categories', 'descriptions', 'descriptions.articleStatus']
        });
    }

    async getPublishingByStatus(statusId: number): Promise<Publishing[]> {
        return this.publishingRepository.find({
            where: { status: { id: statusId } },
            relations: ['status', 'categories', 'descriptions', 'descriptions.articleStatus']
        });
    }
}