"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewsService = void 0;
class ReviewsService {
    constructor(reviewsRepository, salesRepository) {
        this.reviewsRepository = reviewsRepository;
        this.salesRepository = salesRepository;
    }
    createReview(createReviewDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { saleId, review, rating } = createReviewDto;
            // Verificar que la venta existe
            const sale = yield this.salesRepository.findOneBy({ id: saleId });
            if (!sale) {
                throw new Error(`La venta con ID ${saleId} no fue encontrada`);
            } // Verificar que no existe ya una reseña para esta venta
            const existingReview = yield this.reviewsRepository.findOne({
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
        });
    }
    getReviews() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.reviewsRepository.find({
                relations: ['sale', 'sale.publishing', 'sale.buyer']
            });
        });
    }
    getReviewById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.reviewsRepository.findOne({
                where: { id },
                relations: ['sale', 'sale.publishing', 'sale.buyer']
            });
        });
    }
    getReviewsBySale(saleId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.reviewsRepository.find({
                where: { sale: { id: saleId } },
                relations: ['sale', 'sale.publishing', 'sale.buyer']
            });
        });
    }
    updateReview(id, updateReviewDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const reviewToUpdate = yield this.reviewsRepository.findOneBy({ id });
            if (!reviewToUpdate) {
                return null;
            }
            const { saleId, review, rating } = updateReviewDto;
            if (saleId) {
                const sale = yield this.salesRepository.findOneBy({ id: saleId });
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
        });
    }
    deleteReview(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const result = yield this.reviewsRepository.delete(id);
            return { affected: (_a = result.affected) !== null && _a !== void 0 ? _a : null };
        });
    }
    getAverageRatingByPublishing(publishingId) {
        return __awaiter(this, void 0, void 0, function* () {
            const reviews = yield this.reviewsRepository
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
        });
    }
}
exports.ReviewsService = ReviewsService;
