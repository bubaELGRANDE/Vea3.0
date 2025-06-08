import { Repository } from 'typeorm';
import { Sales } from '../../core/entity/Sales';
import { Publishing } from '../../core/entity/Publishing';
import { Buyers } from '../../core/entity/Buyers';
import { SaleStatus } from '../../core/entity/SaleStatus';
import { CreateSaleDto, UpdateSaleDto } from './sales.model';
// Asegúrate de que la entidad Users esté disponible si no lo está ya a través de las otras entidades.
// import { Users } from '../../core/entity/Users'; // Probablemente no sea necesario importarla directamente aquí

export class SalesService {
    constructor(
        private readonly salesRepository: Repository<Sales>,
        private readonly publishingRepository: Repository<Publishing>,
        private readonly buyersRepository: Repository<Buyers>,
        private readonly saleStatusRepository: Repository<SaleStatus>
    ) {}

    async createSale(createSaleDto: CreateSaleDto): Promise<Sales> {
        const { publishingId, buyerId, statusId } = createSaleDto;

        const publishing = await this.publishingRepository.findOneBy({ id: publishingId });
        if (!publishing) {
            throw new Error(`La publicación con ID ${publishingId} no fue encontrada`);
        }

        const buyer = await this.buyersRepository.findOneBy({ id: buyerId });
        if (!buyer) {
            throw new Error(`El comprador con ID ${buyerId} no fue encontrado`);
        }

        const status = await this.saleStatusRepository.findOneBy({ id: statusId });
        if (!status) {
            throw new Error(`El estado con ID ${statusId} no fue encontrado`);
        }
        const newSale = this.salesRepository.create({
            publishing: publishing,
            buyer: buyer,
            status: status
            // TypeORM se encargará del createdAt si está decorado con @CreateDateColumn
        });

        return this.salesRepository.save(newSale);
    }

    async getSales(): Promise<Sales[]> {
        // --- RELACIONES CORREGIDAS AQUÍ ---
        // Añadimos 'buyer.user' para cargar la entidad User dentro de Buyer.
        // Añadimos 'publishing.seller' por si se necesita para la dirección o info del vendedor.
        return this.salesRepository.find({
            relations: [
                'publishing',
                'publishing.seller', // Para obtener la dirección del vendedor si es necesario
                // 'publishing.seller.user', // Si necesitaras el nombre de usuario del vendedor
                'buyer',
                'buyer.user',       // <--- ESTA ES LA CLAVE PARA EL NOMBRE DEL CLIENTE
                'status'
            ],
            order: { id: 'DESC' } // Ejemplo de ordenamiento
        });
    }

    async getSaleById(id: number): Promise<Sales | null> {
        // --- RELACIONES CORREGIDAS AQUÍ TAMBIÉN ---
        // Es bueno ser consistente y cargar lo que la vista de detalle pueda necesitar.
        return this.salesRepository.findOne({
            where: { id },
            relations: [
                'publishing',
                'publishing.seller',
                'publishing.seller.user',
                'buyer',
                'buyer.user',       // <--- ESTA ES LA CLAVE PARA EL NOMBRE DEL CLIENTE
                'status',
                // 'saleDetails', // Si usas una entidad SaleDet para los items, considera cargarla aquí también
                // 'reviews' // Si necesitas mostrar reseñas en el detalle
            ]
        });
    }

    async updateSale(id: number, updateSaleDto: UpdateSaleDto): Promise<Sales | null> {
        const saleToUpdate = await this.salesRepository.findOneBy({ id });
        if (!saleToUpdate) {
            return null;
        }

        const { publishingId, buyerId, statusId } = updateSaleDto;

        if (publishingId) {
            const publishing = await this.publishingRepository.findOneBy({ id: publishingId });
            if (!publishing) {
                throw new Error(`La publicación con ID ${publishingId} no fue encontrada`);
            }
            saleToUpdate.publishing = publishing;
        }

        if (buyerId) {
            const buyer = await this.buyersRepository.findOneBy({ id: buyerId });
            if (!buyer) {
                throw new Error(`El comprador con ID ${buyerId} no fue encontrado`);
            }
            saleToUpdate.buyer = buyer;
        }

        if (statusId) {
            const status = await this.saleStatusRepository.findOneBy({ id: statusId });
            if (!status) {
                throw new Error(`El estado con ID ${statusId} no fue encontrado`);
            }
            saleToUpdate.status = status;
        }

        return this.salesRepository.save(saleToUpdate);
    }

    async deleteSale(id: number): Promise<{ affected: number | null }> {
        const result = await this.salesRepository.delete(id);
        return { affected: result.affected ?? null };
    }
}
