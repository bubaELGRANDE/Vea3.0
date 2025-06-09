import { Repository } from 'typeorm';
import { Sales } from '../../core/entity/Sales';
import { Publishing } from '../../core/entity/Publishing';
import { Buyers } from '../../core/entity/Buyers';
import { SaleStatus } from '../../core/entity/SaleStatus';
import { CreateSaleDto, UpdateSaleDto } from './sales.model';

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
        }        const newSale = this.salesRepository.create({
            publishing: publishing,
            buyer: buyer,
            status: status
        });

        return this.salesRepository.save(newSale);
    }    async getSales(): Promise<Sales[]> {
        return this.salesRepository.find({
            relations: ['publishing', 'buyer', 'status']
        });
    }

    async getSaleById(id: number): Promise<Sales | null> {
        return this.salesRepository.findOne({
            where: { id },
            relations: ['publishing', 'buyer', 'status']
        });
    }

    async updateSale(id: number, updateSaleDto: UpdateSaleDto): Promise<Sales | null> {
        const saleToUpdate = await this.salesRepository.findOneBy({ id });
        if (!saleToUpdate) {
            return null;
        }

        const { publishingId, buyerId, statusId } = updateSaleDto;        if (publishingId) {
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
