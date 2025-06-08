import { AppDataSource } from '../../core/confi/data-source';
import { Payload } from '../../core/entity/Payload';
import { Repository } from 'typeorm';

export class PayloadService {
    private payloadRepository: Repository<Payload>;

    constructor() {
        this.payloadRepository = AppDataSource.getRepository(Payload);
    }

    /**
     * Obtiene todos los registros de payload (pagos) y carga
     * las relaciones anidadas necesarias para la lista de pagos.
     */
    async getAllPayloads(): Promise<Payload[]> {
        // La clave está en el array 'relations'. Le decimos a TypeORM que traiga
        // no solo el pago, sino también la venta, y dentro de la venta, la publicación y el comprador con su usuario.
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

    /**
     * Obtiene un único pago por su ID con todas sus relaciones.
     */
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
