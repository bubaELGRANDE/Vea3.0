import { AppDataSource } from '../../core/confi/data-source';
import { Buyers } from '../../core/entity/Buyers';
import { Users } from '../../core/entity/Users'; // Asegurarse de que Users esté importado
import { Repository } from 'typeorm';
import { CreateBuyerDto, UpdateBuyerDto } from './buyers.model'; // Importar DTOs del Canvas

export class BuyersService {
    private buyersRepository: Repository<Buyers>;
    private usersRepository: Repository<Users>;

    constructor() {
        this.buyersRepository = AppDataSource.getRepository(Buyers);
        this.usersRepository = AppDataSource.getRepository(Users);
    }

    async createBuyer(buyerDto: CreateBuyerDto): Promise<Buyers> {
        // Desestructuramos también 'direction' del DTO.
        const { userId, phone, direction } = buyerDto;

        // Verificar si el usuario existe
        const user = await this.usersRepository.findOneBy({ id: userId });
        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        // Crear una nueva instancia de Buyer con todos los datos, incluyendo la dirección.
        const newBuyer = this.buyersRepository.create({
            user: user,
            phone: phone,
            direction: direction // Asignar la dirección del DTO a la entidad
        });

        return this.buyersRepository.save(newBuyer);
    }

    async getAllBuyers(): Promise<Buyers[]> {
        
        return this.buyersRepository.find({ relations: ['user'] });
    }

    async getBuyerById(id: number): Promise<Buyers | null> {
        return this.buyersRepository.findOne({ where: { id }, relations: ['user'] });
    }

    async updateBuyer(id: number, buyerDto: UpdateBuyerDto): Promise<Buyers | null> {
        const buyerToUpdate = await this.buyersRepository.findOneBy({ id });
        if (!buyerToUpdate) {
            return null; // O lanzar un error si se prefiere
        }

      
        if (buyerDto.userId !== undefined) {
            const user = await this.usersRepository.findOneBy({ id: buyerDto.userId });
            if (!user) {
                throw new Error('Usuario no encontrado para la actualización');
            }
            buyerToUpdate.user = user;
        }

        // Si se proporciona un nuevo teléfono, actualizarlo.
        if (buyerDto.phone !== undefined) {
            buyerToUpdate.phone = buyerDto.phone;
        }

       
        // Si se proporciona una nueva dirección, actualizarla.
        if (buyerDto.direction !== undefined) {
            buyerToUpdate.direction = buyerDto.direction;
        }
        // ---------------------------------------------

        await this.buyersRepository.save(buyerToUpdate);
        // Devolver el comprador actualizado con la relación de usuario cargada.
        return this.getBuyerById(id);
    }

    async deleteBuyer(id: number): Promise<{ affected?: number }> {
        const result = await this.buyersRepository.delete(id);
        return { affected: result.affected ?? 0 }; // Devolver 0 si result.affected es null o undefined
    }
}
