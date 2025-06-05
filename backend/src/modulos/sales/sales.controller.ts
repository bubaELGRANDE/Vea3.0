import { Request, Response } from 'express';
import { SalesService } from './sales.service';
import { CreateSaleDto, UpdateSaleDto } from './sales.model';
import { AppDataSource } from '../../core/confi/data-source';
import { Sales } from '../../core/entity/Sales';
import { Publishing } from '../../core/entity/Publishing';
import { Buyers } from '../../core/entity/Buyers';
import { SaleStatus } from '../../core/entity/SaleStatus';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

export class SalesController {
    private readonly salesService: SalesService;

    constructor() {
        const salesRepository = AppDataSource.getRepository(Sales);
        const publishingRepository = AppDataSource.getRepository(Publishing);
        const buyersRepository = AppDataSource.getRepository(Buyers);
        const saleStatusRepository = AppDataSource.getRepository(SaleStatus);
        
        this.salesService = new SalesService(
            salesRepository,
            publishingRepository,
            buyersRepository,
            saleStatusRepository
        );
    }

    async createSale(req: Request, res: Response): Promise<void> {
        try {
            const createSaleDto = plainToClass(CreateSaleDto, req.body);
            const errors = await validate(createSaleDto);
            if (errors.length > 0) {
                res.status(400).json({ message: 'Validación fallida', errors });
                return;
            }
            const sale = await this.salesService.createSale(createSaleDto);
            res.status(201).json(sale);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getSales(res: Response): Promise<void> {
        try {
            const sales = await this.salesService.getSales();
            res.status(200).json(sales);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getSaleById(req: Request, res: Response): Promise<void> {
        try {
            const saleId = parseInt(req.params.id, 10);
            const sale = await this.salesService.getSaleById(saleId);
            if (sale) {
                res.status(200).json(sale);
            } else {
                res.status(404).json({ message: 'Venta no encontrada' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateSale(req: Request, res: Response): Promise<void> {
        try {
            const saleId = parseInt(req.params.id, 10);
            const updateSaleDto = plainToClass(UpdateSaleDto, req.body);
            const errors = await validate(updateSaleDto);
            if (errors.length > 0) {
                res.status(400).json({ message: 'Validación fallida', errors });
                return;
            }
            const sale = await this.salesService.updateSale(saleId, updateSaleDto);
            if (sale) {
                res.status(200).json(sale);
            } else {
                res.status(404).json({ message: 'Venta no encontrada' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteSale(req: Request, res: Response): Promise<void> {
        try {
            const saleId = parseInt(req.params.id, 10);
            const result = await this.salesService.deleteSale(saleId);
            if (result.affected && result.affected > 0) {
                res.status(200).json({ message: 'Venta eliminada con éxito' });
            } else {
                res.status(404).json({ message: 'Venta no encontrada o ya eliminada' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}
