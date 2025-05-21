import { Repository } from 'typeorm';
import { Publishing } from '../../core/entity/Publishing';
import { PublishingStatus } from '../../core/entity/PublishingStatus';
import { Sellers } from '../../core/entity/Sellers';
import { Categories } from '../../core/entity/Categories';
import { PublishingCategories } from '../../core/entity/PublishingCategories';
import { CreateProductDto, UpdateProductDto } from './productos.model';

export class ProductService {
    constructor(
        private readonly publishingRepository: Repository<Publishing>,
        private readonly publishingStatusRepository: Repository<PublishingStatus>,
        private readonly sellersRepository: Repository<Sellers>,
        private readonly categoriesRepository: Repository<Categories>,
        private readonly publishingCategoriesRepository: Repository<PublishingCategories>
    ) {}

    async createProduct(createProductDto: CreateProductDto): Promise<Publishing> {
        const { title, article, description, price, type, statusId, sellerId, categoryId } = createProductDto;

        const status = await this.publishingStatusRepository.findOneBy({ id: statusId });
        if (!status) {
            throw new Error(`El estado con el id ${statusId} no fue encontrado`);
        }

        const seller = await this.sellersRepository.findOneBy({ id: sellerId });
        if (!seller) {
            throw new Error(`El vendedor con el id ${sellerId} no fue encontrado`);
        }

        const category = await this.categoriesRepository.findOneBy({ id: categoryId });
        if (!category) {
            throw new Error(`La categoria con id ${categoryId} no fue encontrada`);
        }

        const newPublishing = this.publishingRepository.create({
            title,
            article,
            description,
            price: price.toString(), // Convertir a string como se define en la entidad
            type,
            status_id: status,
            seller_id: seller,
        });

        // save() puede devolver una entidad o un array de entidades dependiendo de la entrada.
        // Como estamos guardando una sola entidad, esperamos una sola entidad de vuelta.
        const savedPublishing = await this.publishingRepository.save(newPublishing);

        const newPublishingCategory = this.publishingCategoriesRepository.create({
            publishing_id: savedPublishing, // savedPublishing es una instancia de Publishing
            category_id: category,
        });
        await this.publishingCategoriesRepository.save(newPublishingCategory);

        return savedPublishing; // Devuelve la instancia única de Publishing
    }

    async getProducts(): Promise<Publishing[]> {
        return this.publishingRepository.find({ relations: ['status_id', 'seller_id'] });
    }

    async getProductById(id: number): Promise<Publishing | null> {
        return this.publishingRepository.findOne({ 
            where: { id }, 
            relations: ['status_id', 'seller_id'] 
        });
    }

    async updateProduct(id: number, updateProductDto: UpdateProductDto): Promise<Publishing | null> {
        const productToUpdate = await this.publishingRepository.findOneBy({ id });
        if (!productToUpdate) {
            return null;
        }

        const { statusId, sellerId, categoryId, price, ...publishingData } = updateProductDto;

        if (statusId) {
            const status = await this.publishingStatusRepository.findOneBy({ id: statusId });
            if (!status) throw new Error(`El estado con el id ${statusId} no fue encontrado`);
            productToUpdate.status_id = status;
        }

        if (sellerId) {
            const seller = await this.sellersRepository.findOneBy({ id: sellerId });
            if (!seller) throw new Error(`El vendedor con el id ${sellerId} no fue encontrado`);
            productToUpdate.seller_id = seller;
        }
        
        if (price !== undefined) {
            productToUpdate.price = price.toString();
        }

        Object.assign(productToUpdate, publishingData);
        const updatedPublishing = await this.publishingRepository.save(productToUpdate);

        if (categoryId) {
            const category = await this.categoriesRepository.findOneBy({ id: categoryId });
            if (!category) throw new Error(`La categoria con id ${categoryId} no fue encontrada`);

            let publishingCategory = await this.publishingCategoriesRepository.findOne({ where: { publishing_id: { id: updatedPublishing.id } } });
            if (publishingCategory) {
                publishingCategory.category_id = category;
                await this.publishingCategoriesRepository.save(publishingCategory);
            } else {
                const newPublishingCategory = this.publishingCategoriesRepository.create({
                    publishing_id: updatedPublishing,
                    category_id: category,
                });
                await this.publishingCategoriesRepository.save(newPublishingCategory);
            }
        }

        return updatedPublishing;
    }

    async deleteProduct(id: number): Promise<void> {
        // Primero eliminar la entrada en PublishingCategories si existe
        const publishingCategory = await this.publishingCategoriesRepository.findOne({ where: { publishing_id: { id } } });
        if (publishingCategory) {
            await this.publishingCategoriesRepository.remove(publishingCategory);
        }
        await this.publishingRepository.delete(id);
    }
}
