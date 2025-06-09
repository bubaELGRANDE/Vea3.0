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
exports.ReviewsController = void 0;
const reviews_service_1 = require("./reviews.service");
const reviews_model_1 = require("./reviews.model");
const data_source_1 = require("../../core/confi/data-source");
const Reviews_1 = require("../../core/entity/Reviews");
const Sales_1 = require("../../core/entity/Sales");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class ReviewsController {
    constructor() {
        const reviewsRepository = data_source_1.AppDataSource.getRepository(Reviews_1.Reviews);
        const salesRepository = data_source_1.AppDataSource.getRepository(Sales_1.Sales);
        this.reviewsService = new reviews_service_1.ReviewsService(reviewsRepository, salesRepository);
    }
    createReview(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createReviewDto = (0, class_transformer_1.plainToClass)(reviews_model_1.CreateReviewDto, req.body);
                const errors = yield (0, class_validator_1.validate)(createReviewDto);
                if (errors.length > 0) {
                    res.status(400).json({ message: 'Validación fallida', errors });
                    return;
                }
                const review = yield this.reviewsService.createReview(createReviewDto);
                res.status(201).json(review);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    getReviews(res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reviews = yield this.reviewsService.getReviews();
                res.status(200).json(reviews);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    getReviewById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reviewId = parseInt(req.params.id, 10);
                const review = yield this.reviewsService.getReviewById(reviewId);
                if (review) {
                    res.status(200).json(review);
                }
                else {
                    res.status(404).json({ message: 'Reseña no encontrada' });
                }
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    getReviewsBySale(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const salesId = parseInt(req.params.saleId, 10);
                const reviews = yield this.reviewsService.getReviewsBySale(salesId);
                res.status(200).json(reviews);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    updateReview(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reviewId = parseInt(req.params.id, 10);
                const updateReviewDto = (0, class_transformer_1.plainToClass)(reviews_model_1.UpdateReviewDto, req.body);
                const errors = yield (0, class_validator_1.validate)(updateReviewDto);
                if (errors.length > 0) {
                    res.status(400).json({ message: 'Validación fallida', errors });
                    return;
                }
                const review = yield this.reviewsService.updateReview(reviewId, updateReviewDto);
                if (review) {
                    res.status(200).json(review);
                }
                else {
                    res.status(404).json({ message: 'Reseña no encontrada' });
                }
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    deleteReview(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reviewId = parseInt(req.params.id, 10);
                const result = yield this.reviewsService.deleteReview(reviewId);
                if (result.affected && result.affected > 0) {
                    res.status(200).json({ message: 'Reseña eliminada con éxito' });
                }
                else {
                    res.status(404).json({ message: 'Reseña no encontrada o ya eliminada' });
                }
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    getAverageRatingByPublishing(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const publishingId = parseInt(req.params.publishingId, 10);
                const averageRating = yield this.reviewsService.getAverageRatingByPublishing(publishingId);
                res.status(200).json({
                    publishingId,
                    averageRating: Math.round(averageRating * 100) / 100 // Redondear a 2 decimales
                });
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
}
exports.ReviewsController = ReviewsController;
