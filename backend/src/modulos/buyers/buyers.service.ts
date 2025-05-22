import { AppDataSource } from '../../core/confi/data-source';
import { Buyers } from '../../core/entity/Buyers';
import { Users } from '../../core/entity/Users'; // Asegurarse de que Users esté importado
import { Repository, DeepPartial } from 'typeorm';
import { CreateBuyerDto, UpdateBuyerDto } from './buyers.model'; // Importar DTOs

export class BuyersService {
    private buyersRepository: Repository<Buyers>;
    private usersRepository: Repository<Users>;

    constructor() {
        this.buyersRepository = AppDataSource.getRepository(Buyers);
        this.usersRepository = AppDataSource.getRepository(Users);
    }

    async createBuyer(buyerDto: CreateBuyerDto): Promise<Buyers> {
        const { user_id, phone } = buyerDto;

        // Verificar si el usuario existe
        const user = await this.usersRepository.findOneBy({ id: user_id });
        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        const buyer = new Buyers();
        buyer.user_id = user;
        buyer.phone = parseInt(phone, 10);

        return this.buyersRepository.save(buyer);
    }

    async getAllBuyers(): Promise<Buyers[]> {
        return this.buyersRepository.find({ relations: ['user_id'] });
    }

    async getBuyerById(id: number): Promise<Buyers | null> {
        return this.buyersRepository.findOne({ where: { id }, relations: ['user_id'] });
    }

    async updateBuyer(id: number, buyerDto: UpdateBuyerDto): Promise<Buyers | null> {
        const buyerToUpdate = await this.buyersRepository.findOneBy({ id });
        if (!buyerToUpdate) {
            return null;
        }

        if (buyerDto.user_id !== undefined) {
            const user = await this.usersRepository.findOneBy({ id: buyerDto.user_id });
            if (!user) {
                throw new Error('Usuario no encontrado para la actualización');
            }
            buyerToUpdate.user_id = user;
        }

        if (buyerDto.phone !== undefined) {
            buyerToUpdate.phone = parseInt(buyerDto.phone, 10);
        }
    
        await this.buyersRepository.save(buyerToUpdate);
        return this.getBuyerById(id); 
    }

    async deleteBuyer(id: number): Promise<{ affected?: number }> {
        const result = await this.buyersRepository.delete(id);
        return { affected: result.affected ?? undefined };
    }
}
