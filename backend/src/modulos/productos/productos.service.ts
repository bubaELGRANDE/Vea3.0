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
    ) {}

    async createProduct(createProductDto: CreateProductDto): Promise<Publishing> {
        const { title, description, price, type, statusId, sellerId } = createProductDto;

        const status = await this.publishingStatusRepository.findOneBy({ id: statusId });
        if (!status) {
            throw new Error(`El estado con el id ${statusId} no fue encontrado`);
        }

        const seller = await this.sellersRepository.findOneBy({ id: sellerId });
        if (!seller) {
            throw new Error(`El vendedor con el id ${sellerId} no fue encontrado`);
        }        const newPublishing = this.publishingRepository.create({
            title,
            description,
            price,
            type,
            status: status,
            seller: seller,
        });

        const savedPublishing = await this.publishingRepository.save(newPublishing);

        return savedPublishing;
    }    async getProducts(): Promise<Publishing[]> {
        return this.publishingRepository.find({ relations: ['status', 'seller'] });
    }

    async getProductById(id: number): Promise<Publishing | null> {
        return this.publishingRepository.findOne({ 
            where: { id }, 
            relations: ['status', 'seller'] 
        });
    }

    async getProductBySellerId(sellerId: number): Promise<Publishing[]> {
        return this.publishingRepository.find({
            where: { seller: { id: sellerId } },
            relations: ['status', 'seller']
        });
    }

    async updateProduct(id: number, updateProductDto: UpdateProductDto): Promise<Publishing | null> {
        const productToUpdate = await this.publishingRepository.findOneBy({ id });
        if (!productToUpdate) {
            return null;
        }

        const { statusId, sellerId, price, ...publishingData } = updateProductDto;        if (statusId) {
            const status = await this.publishingStatusRepository.findOneBy({ id: statusId });
            if (!status) throw new Error(`El estado con el id ${statusId} no fue encontrado`);
            productToUpdate.status = status;
        }

        if (sellerId) {
            const seller = await this.sellersRepository.findOneBy({ id: sellerId });
            if (!seller) throw new Error(`El vendedor con el id ${sellerId} no fue encontrado`);
            productToUpdate.seller = seller;
        }
        
        if (price !== undefined) {
            productToUpdate.price = price;
        }

        Object.assign(productToUpdate, publishingData);
        const updatedPublishing = await this.publishingRepository.save(productToUpdate);

        return updatedPublishing;
    }    async deleteProduct(id: number): Promise<{ affected: number | null }> {
        const result = await this.publishingRepository.delete(id);
        return { affected: result.affected ?? null };
    }
}

