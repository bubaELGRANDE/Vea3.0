import { Request, Response } from 'express';
import { CatalogosService } from './catalogos.service';

export class CatalogosController {
    private catalogosService = new CatalogosService();

    async getCategories(req: Request, res: Response): Promise<void> {
        try {
            const categories = await this.catalogosService.getCategories();
            res.json(categories);
        } catch (error) {
            res.status(500).send({ message: 'Error retrieving categories', error });
        }
    }

    async getPublishingStatus(req: Request, res: Response): Promise<void> {
        try {
            const publishingStatus = await this.catalogosService.getPublishingStatus();
            res.json(publishingStatus);
        } catch (error) {
            res.status(500).send({ message: 'Error retrieving publishing status', error });
        }
    }

    async getSaleStatus(req: Request, res: Response): Promise<void> {
        try {
            const saleStatus = await this.catalogosService.getSaleStatus();
            res.json(saleStatus);
        } catch (error) {
            res.status(500).send({ message: 'Error retrieving sale status', error });
        }
    }
}
