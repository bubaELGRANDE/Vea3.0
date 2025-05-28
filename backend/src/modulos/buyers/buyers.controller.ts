import { Request, Response } from 'express';
import { BuyersService } from './buyers.service';
import { CreateBuyerDto, UpdateBuyerDto } from './buyers.model';
import { validate } from 'class-validator';
import { Users } from '../../core/entity/Users';

export class BuyersController {
    private buyersService: BuyersService;

    constructor() {
        this.buyersService = new BuyersService();
<<<<<<< HEAD
    }

    async createBuyer(req: Request, res: Response): Promise<void> {
        try {
            const createBuyerDto = new CreateBuyerDto();
            createBuyerDto.user_id = req.body.user_id;
=======
    }    async createBuyer(req: Request, res: Response): Promise<void> {
        try {
            const createBuyerDto = new CreateBuyerDto();
            createBuyerDto.userId = req.body.userId;
>>>>>>> main
            createBuyerDto.phone = req.body.phone;

            const errors = await validate(createBuyerDto);
            if (errors.length > 0) {
                res.status(400).json({ message: 'Validacion fallida', errors });
                return;
            }

            const newBuyer = await this.buyersService.createBuyer(createBuyerDto);
            res.status(201).json(newBuyer);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getAllBuyers(req: Request, res: Response) {
        try {
            const buyers = await this.buyersService.getAllBuyers();
            res.status(200).json(buyers);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getBuyerById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 10);
            const buyer = await this.buyersService.getBuyerById(id);
            if (buyer) {
                res.status(200).json(buyer);
            } else {
                res.status(404).json({ message: 'Comprador no encontrado' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateBuyer(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                res.status(400).json({ message: 'Formato de ID inválido' });
                return;
<<<<<<< HEAD
            }

            const updateBuyerDto = new UpdateBuyerDto();
            if (req.body.user_id !== undefined) updateBuyerDto.user_id = req.body.user_id;
=======
            }            const updateBuyerDto = new UpdateBuyerDto();
            if (req.body.userId !== undefined) updateBuyerDto.userId = req.body.userId;
>>>>>>> main
            if (req.body.phone !== undefined) updateBuyerDto.phone = req.body.phone;

            const errors = await validate(updateBuyerDto, { skipMissingProperties: true });
            if (errors.length > 0) {
                res.status(400).json({ message: 'Validacion fallida', errors });
                return;
            }

            const updatedBuyer = await this.buyersService.updateBuyer(id, updateBuyerDto);
            if (updatedBuyer) {
                res.status(200).json(updatedBuyer);
            } else {
                res.status(404).json({ message: 'Comprador no encontrado' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteBuyer(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 10);
            const result = await this.buyersService.deleteBuyer(id);
            if (result.affected && result.affected > 0) {
                res.status(200).json({ message: 'Comprador eliminado con éxito' });
            } else {
                res.status(404).json({ message: 'Comprador no encontrado o ya eliminado' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}
