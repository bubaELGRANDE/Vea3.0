import { Repository } from 'typeorm';
import { Reviews } from '../../core/entity/Reviews';
import { Sales } from '../../core/entity/Sales';
import { CreateReviewDto, UpdateReviewDto } from './reviews.model';

export class ReviewsService {
    constructor(
        private readonly reviewsRepository: Repository<Reviews>,
        private readonly salesRepository: Repository<Sales>
    ) {}    async createReview(createReviewDto: CreateReviewDto): Promise<Reviews> {
        const { saleId, review, rating } = createReviewDto;

        // Verificar que la venta existe
        const sale = await this.salesRepository.findOneBy({ id: saleId });
        if (!sale) {
            throw new Error(`La venta con ID ${saleId} no fue encontrada`);
        }        // Verificar que no existe ya una reseña para esta venta
        const existingReview = await this.reviewsRepository.findOne({
            where: { sale: { id: saleId } }
        });
        if (existingReview) {
            throw new Error(`Ya existe una reseña para la venta con ID ${saleId}`);
        }

        const newReview = this.reviewsRepository.create({
            sale: sale,
            review,
            rating
        });

        return this.reviewsRepository.save(newReview);
    }async getReviews(): Promise<Reviews[]> {
        return this.reviewsRepository.find({
            relations: ['sale', 'sale.publishing', 'sale.buyer']
        });
    }

    async getReviewById(id: number): Promise<Reviews | null> {
        return this.reviewsRepository.findOne({
            where: { id },
            relations: ['sale', 'sale.publishing', 'sale.buyer']
        });
    }    async getReviewsBySale(saleId: number): Promise<Reviews[]> {
        return this.reviewsRepository.find({
            where: { sale: { id: saleId } },
            relations: ['sale', 'sale.publishing', 'sale.buyer']
        });
    }

    async updateReview(id: number, updateReviewDto: UpdateReviewDto): Promise<Reviews | null> {
        const reviewToUpdate = await this.reviewsRepository.findOneBy({ id });
        if (!reviewToUpdate) {
            return null;
        }        const { saleId, review, rating } = updateReviewDto;

        if (saleId) {
            const sale = await this.salesRepository.findOneBy({ id: saleId });
            if (!sale) {
                throw new Error(`La venta con ID ${saleId} no fue encontrada`);
            }
            reviewToUpdate.sale = sale;
        }

        if (review !== undefined) {
            reviewToUpdate.review = review;
        }

        if (rating !== undefined) {
            reviewToUpdate.rating = rating;
        }

        return this.reviewsRepository.save(reviewToUpdate);
    }

    async deleteReview(id: number): Promise<{ affected: number | null }> {
        const result = await this.reviewsRepository.delete(id);
        return { affected: result.affected ?? null };
    }

    async getAverageRatingByPublishing(publishingId: number): Promise<number> {        const reviews = await this.reviewsRepository
            .createQueryBuilder('review')
            .leftJoin('review.sale', 'sale')
            .leftJoin('sale.publishing', 'publishing')
            .where('publishing.id = :publishingId', { publishingId })
            .getMany();

        if (reviews.length === 0) {
            return 0;
        }

        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        return totalRating / reviews.length;
    }
}
