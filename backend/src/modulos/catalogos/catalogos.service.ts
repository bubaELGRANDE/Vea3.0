import { AppDataSource } from '../../core/confi/data-source';
import { Categories } from '../../core/entity/Categories';
import { PublishingStatus } from '../../core/entity/PublishingStatus';
import { SaleStatus } from '../../core/entity/SaleStatus';

export class CatalogosService {
    private categoriesRepository = AppDataSource.getRepository(Categories);
    private publishingStatusRepository = AppDataSource.getRepository(PublishingStatus);
    private saleStatusRepository = AppDataSource.getRepository(SaleStatus);

    async getCategories(): Promise<Categories[]> {
        return this.categoriesRepository.find();
    }

    async getPublishingStatus(): Promise<PublishingStatus[]> {
        return this.publishingStatusRepository.find();
    }

    async getSaleStatus(): Promise<SaleStatus[]> {
        return this.saleStatusRepository.find();
    }
}
