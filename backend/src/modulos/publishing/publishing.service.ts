import { AppDataSource } from '../../core/confi/data-source';
import { Publishing } from '../../core/entity/Publishing';
import { PublishingStatus } from '../../core/entity/PublishingStatus';
import { Sellers } from '../../core/entity/Sellers';

export class PublishingService {
    private publishingRepository = AppDataSource.getRepository(Publishing);
    private publishingStatusRepository = AppDataSource.getRepository(PublishingStatus);
    private sellersRepository = AppDataSource.getRepository(Sellers);    async getAllPublishing(): Promise<Publishing[]> {
        return this.publishingRepository.find({
            relations: ['status', 'seller']
        });
    }

    async getPublishingById(id: number): Promise<Publishing | null> {
        return this.publishingRepository.findOne({
            where: { id },
            relations: ['status', 'seller']
        });
    }

    async getPublishingBySeller(sellerId: number): Promise<Publishing[]> {
        return this.publishingRepository.find({
            where: { seller: { id: sellerId } },
            relations: ['status', 'seller']
        });
    }

    async getPublishingByStatus(statusId: number): Promise<Publishing[]> {
        return this.publishingRepository.find({
            where: { status: { id: statusId } },
            relations: ['status', 'seller']
        });
    }
}
