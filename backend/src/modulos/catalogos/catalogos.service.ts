import { AppDataSource } from '../../core/confi/data-source';
import { Categories } from '../../core/entity/Categories';
import { PublishingStatus } from '../../core/entity/PublishingStatus';
import { SaleStatus } from '../../core/entity/SaleStatus';
import { ArticleStatus } from '../../core/entity/ArticleStatus';

export class CatalogosService {
    private categoriesRepository = AppDataSource.getRepository(Categories);
    private publishingStatusRepository = AppDataSource.getRepository(PublishingStatus);
    private saleStatusRepository = AppDataSource.getRepository(SaleStatus);
    private articleStatusRepository = AppDataSource.getRepository(ArticleStatus);

    // GET para Categories
    async getCategories(): Promise<Categories[]> {
        return this.categoriesRepository.find();
    }

    async getCategoryById(id: number): Promise<Categories | null> {
        return this.categoriesRepository.findOne({ where: { id } });
    }

    // GET para PublishingStatus
    async getPublishingStatus(): Promise<PublishingStatus[]> {
        return this.publishingStatusRepository.find();
    }

    async getPublishingStatusById(id: number): Promise<PublishingStatus | null> {
        return this.publishingStatusRepository.findOne({ where: { id } });
    }

    // GET para SaleStatus
    async getSaleStatus(): Promise<SaleStatus[]> {
        return this.saleStatusRepository.find();
    }

    async getSaleStatusById(id: number): Promise<SaleStatus | null> {
        return this.saleStatusRepository.findOne({ where: { id } });
    }


    // GET para ArticleStatus
    async getArticleStatus(): Promise<ArticleStatus[]> {
        return this.articleStatusRepository.find();
    }

    async getArticleStatusById(id: number): Promise<ArticleStatus | null> {
        return this.articleStatusRepository.findOne({ where: { id } });
    }

}
