import { Repository } from 'typeorm';
import { Chat } from '../../core/entity/Chat';
import { Publishing } from '../../core/entity/Publishing';
import { Buyers } from '../../core/entity/Buyers';
import { Sellers } from '../../core/entity/Sellers';
import { CreateChatDto, UpdateChatDto } from './chat.model';

export class ChatService {
    constructor(
        private readonly chatRepository: Repository<Chat>,
        private readonly publishingRepository: Repository<Publishing>,
        private readonly buyersRepository: Repository<Buyers>,
        private readonly sellersRepository: Repository<Sellers>
    ) {}    async createChat(createChatDto: CreateChatDto): Promise<Chat> {
        const { publishingId, buyerId, sellerId, isEnable } = createChatDto;

        // Verificar que la publicación existe
        const publishing = await this.publishingRepository.findOneBy({ id: publishingId });
        if (!publishing) {
            throw new Error(`La publicación con ID ${publishingId} no fue encontrada`);
        }        // Verificar que el comprador existe
        const buyer = await this.buyersRepository.findOneBy({ id: buyerId });
        if (!buyer) {
            throw new Error(`El comprador con ID ${buyerId} no fue encontrado`);
        }

        // Verificar que el vendedor existe
        const seller = await this.sellersRepository.findOneBy({ id: sellerId });
        if (!seller) {
            throw new Error(`El vendedor con ID ${sellerId} no fue encontrado`);
        }        // Verificar que no existe ya un chat para esta combinación
        const existingChat = await this.chatRepository.findOne({
            where: {
                publishing: { id: publishingId },
                buyer: { id: buyerId },
                seller: { id: sellerId }
            }
        });

        if (existingChat) {
            throw new Error(`Ya existe un chat para esta publicación entre estos usuarios`);
        }

        const newChat = this.chatRepository.create({
            publishing: publishing,
            buyer: buyer,
            seller: seller,
            isEnable: isEnable
        });

        return this.chatRepository.save(newChat);
    }    async getChats(): Promise<Chat[]> {
        return this.chatRepository.find({
            relations: ['publishing', 'buyer', 'seller']
        });
    }    async getChatById(id: number): Promise<Chat | null> {
        return this.chatRepository.findOne({
            where: { id },
            relations: ['publishing', 'buyer', 'seller']
        });
    }    async getChatsByBuyer(buyerId: number): Promise<Chat[]> {
        return this.chatRepository.find({
            where: { buyer: { id: buyerId } },
            relations: ['publishing', 'buyer', 'seller']
        });
    }    async getChatsBySeller(sellerId: number): Promise<Chat[]> {
        return this.chatRepository.find({
            where: { seller: { id: sellerId } },
            relations: ['publishing', 'buyer', 'seller']
        });
    }    async getChatsByPublishing(publishingId: number): Promise<Chat[]> {
        return this.chatRepository.find({
            where: { publishing: { id: publishingId } },
            relations: ['publishing', 'buyer', 'seller']
        });
    }    async updateChat(id: number, updateChatDto: UpdateChatDto): Promise<Chat | null> {
        const chatToUpdate = await this.chatRepository.findOneBy({ id });
        if (!chatToUpdate) {
            return null;
        }

        const { publishingId, buyerId, sellerId, isEnable } = updateChatDto;

        if (publishingId) {
            const publishing = await this.publishingRepository.findOneBy({ id: publishingId });
            if (!publishing) {
                throw new Error(`La publicación con ID ${publishingId} no fue encontrada`);
            }
            chatToUpdate.publishing = publishing;
        }

        if (buyerId) {
            const buyer = await this.buyersRepository.findOneBy({ id: buyerId });
            if (!buyer) {
                throw new Error(`El comprador con ID ${buyerId} no fue encontrado`);
            }
            chatToUpdate.buyer = buyer;
        }

        if (sellerId) {
            const seller = await this.sellersRepository.findOneBy({ id: sellerId });
            if (!seller) {
                throw new Error(`El vendedor con ID ${sellerId} no fue encontrado`);
            }
            chatToUpdate.seller = seller;
        }

        if (isEnable !== undefined) {
            chatToUpdate.isEnable = isEnable;
        }

        return this.chatRepository.save(chatToUpdate);
    }

    async deleteChat(id: number): Promise<{ affected: number | null }> {
        const result = await this.chatRepository.delete(id);
        return { affected: result.affected ?? null };
    }    async enableChat(id: number): Promise<Chat | null> {
        const chat = await this.chatRepository.findOneBy({ id });
        if (!chat) {
            return null;
        }
        chat.isEnable = true;
        return this.chatRepository.save(chat);
    }    async disableChat(id: number): Promise<Chat | null> {
        const chat = await this.chatRepository.findOneBy({ id });
        if (!chat) {
            return null;
        }
        chat.isEnable = false;
        return this.chatRepository.save(chat);
    }
}
