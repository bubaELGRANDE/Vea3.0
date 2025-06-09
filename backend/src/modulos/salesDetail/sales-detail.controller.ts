// sales-detail-controller.ts
import { Request, Response } from 'express';
import { SalesServiceDetail } from './sales-detail.service';

export class SalesDetailController {
    private salesServiceDetail: SalesServiceDetail;

    constructor() {
        this.salesServiceDetail = new SalesServiceDetail();
    }

    /**
     * Obtiene el detalle completo de una venta por su ID.
     */
    async getSaleById(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                res.status(400).json({ message: 'El ID proporcionado no es un número válido.' });
                return;
            }

            const saleDetail = await this.salesServiceDetail.getSaleById(id);

            if (saleDetail) {
                res.status(200).json(saleDetail);
            } else {
                res.status(404).json({ message: `Venta con ID ${id} no encontrada.` });
            }
        } catch (error: any) {
            console.error('Error en getSaleById:', error);
            res.status(500).json({ message: 'Error al obtener el detalle de la venta.', error: error.message });
        }
    }
}