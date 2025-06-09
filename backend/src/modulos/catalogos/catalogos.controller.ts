import { Request, Response } from 'express';
import { CatalogosService } from './catalogos.service';

export class CatalogosController {
    private catalogosService = new CatalogosService();

    // Controladores para Categories
    async getCategories(res: Response): Promise<void> {
        try {
            const categories = await this.catalogosService.getCategories();
            res.json(categories);
        } catch (error) {
            res.status(500).send({ message: 'Error al recuperar las categorías', error });
        }
    }

    async getCategoryById(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const category = await this.catalogosService.getCategoryById(id);
            if (category) {
                res.json(category);
            } else {
                res.status(404).send({ message: 'Categoría no encontrada' });
            }
        } catch (error) {
            res.status(500).send({ message: 'Error al recuperar la categoría', error });
        }
    }

    // Controladores para PublishingStatus
    async getPublishingStatus(res: Response): Promise<void> {
        try {
            const publishingStatus = await this.catalogosService.getPublishingStatus();
            res.json(publishingStatus);
        } catch (error) {
            res.status(500).send({ message: 'Error al recuperar el estado de publicación', error });
        }
    }

    async getPublishingStatusById(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const status = await this.catalogosService.getPublishingStatusById(id);
            if (status) {
                res.json(status);
            } else {
                res.status(404).send({ message: 'Estado de publicación no encontrado' });
            }
        } catch (error) {
            res.status(500).send({ message: 'Error al recuperar el estado de publicación', error });
        }
    }

    // Controladores para SaleStatus
    async getSaleStatus(res: Response): Promise<void> {
        try {
            const saleStatus = await this.catalogosService.getSaleStatus();
            res.json(saleStatus);
        } catch (error) {
            res.status(500).send({ message: 'Error al recuperar el estado de venta', error });
        }
    }

    async getSaleStatusById(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const status = await this.catalogosService.getSaleStatusById(id);
            if (status) {
                res.json(status);
            } else {
                res.status(404).send({ message: 'Estado de venta no encontrado' });
            }
        } catch (error) {
            res.status(500).send({ message: 'Error al recuperar el estado de venta', error });
        }
    }

    // Controladores para ArticleStatus
    async getArticleStatus(res: Response): Promise<void> {
        try {
            const articleStatus = await this.catalogosService.getArticleStatus();
            res.json(articleStatus);
        } catch (error) {
            res.status(500).send({ message: 'Error al recuperar el estado del artículo', error });
        }
    }

    async getArticleStatusById(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const status = await this.catalogosService.getArticleStatusById(id);
            if (status) {
                res.json(status);
            } else {
                res.status(404).send({ message: 'Estado de artículo no encontrado' });
            }
        } catch (error) {
            res.status(500).send({ message: 'Error al recuperar el estado del artículo', error });
        }
    }
}
