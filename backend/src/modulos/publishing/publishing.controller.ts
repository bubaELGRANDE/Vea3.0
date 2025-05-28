import { Request, Response } from 'express';
import { PublishingService } from './publishing.service';

export class PublishingController {
    private publishingService: PublishingService;

    constructor() {
        this.publishingService = new PublishingService();
    }

    async getAllPublishing(req: Request, res: Response): Promise<void> {
        try {
            const publishings = await this.publishingService.getAllPublishing();
            res.status(200).json(publishings);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getPublishingById(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id, 10);
            const publishing = await this.publishingService.getPublishingById(id);
            if (publishing) {
                res.status(200).json(publishing);
            } else {
                res.status(404).json({ message: 'Publicación no encontrada' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getPublishingBySeller(req: Request, res: Response): Promise<void> {
        try {
            const sellerId = parseInt(req.params.sellerId, 10);
            const publishings = await this.publishingService.getPublishingBySeller(sellerId);
            res.status(200).json(publishings);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getPublishingByStatus(req: Request, res: Response): Promise<void> {
        try {
            const statusId = parseInt(req.params.statusId, 10);
            const publishings = await this.publishingService.getPublishingByStatus(statusId);
            res.status(200).json(publishings);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}
