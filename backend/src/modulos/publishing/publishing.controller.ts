import { Request, Response } from 'express';
import { PublishingService } from './publishing.service';
import { CreatePublishingDto } from './publishing.model';
import { validate } from 'class-validator';

export class PublishingController {
    private publishingService: PublishingService;

    constructor() {
        this.publishingService = new PublishingService();
    }

    /**
     * Maneja la creación de una nueva publicación.
     */
    async createPublishing(req: Request, res: Response): Promise<void> {
        try {
            const createPublishingDto = new CreatePublishingDto();
            createPublishingDto.title = req.body.title;
            createPublishingDto.description = req.body.description;
            createPublishingDto.price = Number(req.body.price);
            createPublishingDto.articleStatusId = Number(req.body.articleStatusId);
            createPublishingDto.categoryIds = req.body.categoryIds;
            createPublishingDto.sku = req.body.sku;
            

            createPublishingDto.sellerId = 1; // TODO: Reemplazar con el ID del vendedor autenticado.

            // Por defecto, una nueva publicación se crea como "Activa" (ID = 1).
            createPublishingDto.statusId = 1; 

            // Validar el DTO
            const errors = await validate(createPublishingDto);
            if (errors.length > 0) {
                res.status(400).json({ message: 'Error de validación', errors });
                return;
            }

            const newPublishing = await this.publishingService.createPublication(createPublishingDto);
            res.status(201).json(newPublishing);

        } catch (error: any) {
            res.status(500).json({ message: 'Error al crear la publicación', error: error.message });
        }
    }

    /**
     * Obtiene todas las publicaciones.
     */
    async getAllPublishing(req: Request, res: Response): Promise<void> {
        try {
            const publishings = await this.publishingService.getAllPublishing();
            res.status(200).json(publishings);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    /**
     * Obtiene una publicación por su ID.
     */
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

    /**
     * Obtiene todas las publicaciones de un vendedor.
     */
    async getPublishingBySeller(req: Request, res: Response): Promise<void> {
        try {
            const sellerId = parseInt(req.params.sellerId, 10);
            const publishings = await this.publishingService.getPublishingBySeller(sellerId);
            res.status(200).json(publishings);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    /**
     * Obtiene todas las publicaciones con un estado específico.
     */
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
