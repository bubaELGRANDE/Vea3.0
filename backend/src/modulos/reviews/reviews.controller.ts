import { Request, Response } from 'express';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto, UpdateReviewDto } from './reviews.model';
import { AppDataSource } from '../../core/confi/data-source';
import { Reviews } from '../../core/entity/Reviews';
import { Sales } from '../../core/entity/Sales';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

export class ReviewsController {
    private readonly reviewsService: ReviewsService;    constructor() {
        const reviewsRepository = AppDataSource.getRepository(Reviews);
        const salesRepository = AppDataSource.getRepository(Sales);
        
        this.reviewsService = new ReviewsService(
            reviewsRepository,
            salesRepository
        );
    }    async createReview(req: Request, res: Response): Promise<void> {
        try {
            const createReviewDto = plainToClass(CreateReviewDto, req.body);
            const errors = await validate(createReviewDto);
            
            if (errors.length > 0) {
                res.status(400).json({ message: 'Validación fallida', errors });
                return;
            }
            
            const review = await this.reviewsService.createReview(createReviewDto);
            res.status(201).json(review);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getReviews(req: Request, res: Response): Promise<void> {
        try {
            const reviews = await this.reviewsService.getReviews();
            res.status(200).json(reviews);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getReviewById(req: Request, res: Response): Promise<void> {
        try {
            const reviewId = parseInt(req.params.id, 10);
            const review = await this.reviewsService.getReviewById(reviewId);
            if (review) {
                res.status(200).json(review);
            } else {
                res.status(404).json({ message: 'Reseña no encontrada' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getReviewsBySale(req: Request, res: Response): Promise<void> {
        try {
            const salesId = parseInt(req.params.saleId, 10);
            const reviews = await this.reviewsService.getReviewsBySale(salesId);
            res.status(200).json(reviews);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateReview(req: Request, res: Response): Promise<void> {
        try {
            const reviewId = parseInt(req.params.id, 10);
            const updateReviewDto = plainToClass(UpdateReviewDto, req.body);
            const errors = await validate(updateReviewDto);
            if (errors.length > 0) {
                res.status(400).json({ message: 'Validación fallida', errors });
                return;
            }
            const review = await this.reviewsService.updateReview(reviewId, updateReviewDto);
            if (review) {
                res.status(200).json(review);
            } else {
                res.status(404).json({ message: 'Reseña no encontrada' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteReview(req: Request, res: Response): Promise<void> {
        try {
            const reviewId = parseInt(req.params.id, 10);
            const result = await this.reviewsService.deleteReview(reviewId);
            if (result.affected && result.affected > 0) {
                res.status(200).json({ message: 'Reseña eliminada con éxito' });
            } else {
                res.status(404).json({ message: 'Reseña no encontrada o ya eliminada' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getAverageRatingByPublishing(req: Request, res: Response): Promise<void> {
        try {
            const publishingId = parseInt(req.params.publishingId, 10);
            const averageRating = await this.reviewsService.getAverageRatingByPublishing(publishingId);
            res.status(200).json({ 
                publishingId, 
                averageRating: Math.round(averageRating * 100) / 100 // Redondear a 2 decimales
            });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}
