import { Request, Response } from 'express';
import { SellersService } from './sellers.service';
import { Sellers } from '../../core/entity/Sellers';

export class SellersController {
    private sellersService: SellersService;

    constructor() {
        this.sellersService = new SellersService();
    }

    async createSeller(req: Request, res: Response) {
        try {
            const sellerData: Partial<Sellers> = req.body;
            const newSeller = await this.sellersService.createSeller(sellerData);
            res.status(201).json(newSeller);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getAllSellers(req: Request, res: Response) {
        try {
            const sellers = await this.sellersService.getAllSellers();
            res.status(200).json(sellers);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getSellerById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 10);
            const seller = await this.sellersService.getSellerById(id);
            if (seller) {
                res.status(200).json(seller);
            } else {
                res.status(404).json({ message: 'Vendedor no encontrado' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateSeller(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 10);
            const sellerData: Partial<Sellers> = req.body;
            const updatedSeller = await this.sellersService.updateSeller(id, sellerData);
            if (updatedSeller) {
                res.status(200).json(updatedSeller);
            } else {
                res.status(404).json({ message: 'Vendedor no encontrado' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteSeller(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 10);
            const result = await this.sellersService.deleteSeller(id);
            if (result.affected && result.affected > 0) {
                res.status(200).json({ message: 'Vendedor eliminado con éxito' });
            } else {
                res.status(404).json({ message: 'Vendedor no encontrado o ya fue eliminado' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}
