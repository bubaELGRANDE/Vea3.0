import { AppDataSource } from '../../core/confi/data-source';
import { Sellers } from '../../core/entity/Sellers';
// import { Users } from '../../core/entity/Users'; // Descomentar si se necesita cargar explícitamente
// import { Municipalities } from '../../core/entity/Municipalities'; // Descomentar si se necesita cargar explícitamente
import { Repository, DeepPartial } from 'typeorm';

export class SellersService {
    private sellersRepository: Repository<Sellers>;

    constructor() {
        this.sellersRepository = AppDataSource.getRepository(Sellers);
    }

    async createSeller(sellerData: DeepPartial<Sellers>): Promise<Sellers> {
        const seller = this.sellersRepository.create(sellerData);
        return this.sellersRepository.save(seller);
    }    async getAllSellers(): Promise<Sellers[]> {
        return this.sellersRepository.find({ relations: ['user', 'municipality'] });
    }

    async getSellerById(id: number): Promise<Sellers | null> {
        return this.sellersRepository.findOne({ where: { id }, relations: ['user', 'municipality'] });
    }

    async updateSeller(id: number, sellerData: DeepPartial<Sellers>): Promise<Sellers | null> {
        await this.sellersRepository.update(id, sellerData);
        return this.getSellerById(id);
    }

    async deleteSeller(id: number): Promise<{ affected?: number }> {
        const result = await this.sellersRepository.delete(id);
        return { affected: result.affected ?? undefined };
    }
}
