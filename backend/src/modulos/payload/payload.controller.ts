import { Request, Response } from 'express';
import { PayloadService } from './payload.service';

export class PayloadController {
    private payloadService: PayloadService;

    constructor() {
        this.payloadService = new PayloadService();
    }

    async getPayloads(req: Request, res: Response): Promise<void> {
        try {
            const payloads = await this.payloadService.getAllPayloads();
            res.status(200).json(payloads);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getPayloadById(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id, 10);
            const payload = await this.payloadService.getPayloadById(id);
            if (payload) {
                res.status(200).json(payload);
            } else {
                res.status(404).json({ message: 'Pago no encontrado' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}
