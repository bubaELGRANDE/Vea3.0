import { AppDataSource } from '../../core/confi/data-source';
import { Payload } from '../../core/entity/Payload';
import { Repository } from 'typeorm';

export class PayloadService {
    private payloadRepository: Repository<Payload>;

    constructor() {
        this.payloadRepository = AppDataSource.getRepository(Payload);
    }


    async getAllPayloads(): Promise<Payload[]> {

        return this.payloadRepository.find({
            relations: [
                "sale",
                "sale.publishing",
                "sale.buyer",
                "sale.buyer.user"
            ],
            order: {
                id: 'DESC' // Ordenar para mostrar los más recientes primero
            }
        });
    }

    async getPayloadById(id: number): Promise<Payload | null> {
        return this.payloadRepository.findOne({
            where: { id },
            relations: [
                "sale",
                "sale.publishing",
                "sale.buyer",
                "sale.buyer.user"
            ]
        });
    }
}
