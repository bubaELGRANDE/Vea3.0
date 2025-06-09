import { Request, Response } from 'express';
import { ChatService } from './chat.service';
import { CreateChatDto, UpdateChatDto } from './chat.model';
import { AppDataSource } from '../../core/confi/data-source';
import { Chat } from '../../core/entity/Chat';
import { Publishing } from '../../core/entity/Publishing';
import { Buyers } from '../../core/entity/Buyers';
import { Sellers } from '../../core/entity/Sellers';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

export class ChatController {
    private readonly chatService: ChatService;

    constructor() {
        const chatRepository = AppDataSource.getRepository(Chat);
        const publishingRepository = AppDataSource.getRepository(Publishing);
        const buyersRepository = AppDataSource.getRepository(Buyers);
        const sellersRepository = AppDataSource.getRepository(Sellers);
        
        this.chatService = new ChatService(
            chatRepository,
            publishingRepository,
            buyersRepository,
            sellersRepository
        );
    }    async createChat(req: Request, res: Response): Promise<void> {
        try {
            console.log('=== DEBUG POST /chat ===');
            console.log('Request body:', req.body);
            
            const createChatDto = plainToClass(CreateChatDto, req.body);
            console.log('DTO created:', createChatDto);
            
            const errors = await validate(createChatDto);
            console.log('Validation errors:', errors);
            
            if (errors.length > 0) {
                console.log('Validation failed, returning 400');
                res.status(400).json({ message: 'Validación fallida', errors });
                return;
            }
            
            console.log('Calling chatService.createChat...');
            const chat = await this.chatService.createChat(createChatDto);
            console.log('Chat created successfully:', chat);
            res.status(201).json(chat);
        } catch (error: any) {
            console.log('Chat service error:', error.message);
            console.log('Full error:', error);
            res.status(500).json({ message: error.message });
        }
    }

    async getChats(res: Response): Promise<void> {
        try {
            const chats = await this.chatService.getChats();
            res.status(200).json(chats);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getChatById(req: Request, res: Response): Promise<void> {
        try {
            const chatId = parseInt(req.params.id, 10);
            const chat = await this.chatService.getChatById(chatId);
            if (chat) {
                res.status(200).json(chat);
            } else {
                res.status(404).json({ message: 'Chat no encontrado' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getChatsByBuyer(req: Request, res: Response): Promise<void> {
        try {
            const buyerId = parseInt(req.params.buyerId, 10);
            const chats = await this.chatService.getChatsByBuyer(buyerId);
            res.status(200).json(chats);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getChatsBySeller(req: Request, res: Response): Promise<void> {
        try {
            const sellerId = parseInt(req.params.sellerId, 10);
            const chats = await this.chatService.getChatsBySeller(sellerId);
            res.status(200).json(chats);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getChatsByPublishing(req: Request, res: Response): Promise<void> {
        try {
            const publishingId = parseInt(req.params.publishingId, 10);
            const chats = await this.chatService.getChatsByPublishing(publishingId);
            res.status(200).json(chats);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateChat(req: Request, res: Response): Promise<void> {
        try {
            const chatId = parseInt(req.params.id, 10);
            const updateChatDto = plainToClass(UpdateChatDto, req.body);
            const errors = await validate(updateChatDto);
            if (errors.length > 0) {
                res.status(400).json({ message: 'Validación fallida', errors });
                return;
            }
            const chat = await this.chatService.updateChat(chatId, updateChatDto);
            if (chat) {
                res.status(200).json(chat);
            } else {
                res.status(404).json({ message: 'Chat no encontrado' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteChat(req: Request, res: Response): Promise<void> {
        try {
            const chatId = parseInt(req.params.id, 10);
            const result = await this.chatService.deleteChat(chatId);
            if (result.affected && result.affected > 0) {
                res.status(200).json({ message: 'Chat eliminado con éxito' });
            } else {
                res.status(404).json({ message: 'Chat no encontrado o ya eliminado' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async enableChat(req: Request, res: Response): Promise<void> {
        try {
            const chatId = parseInt(req.params.id, 10);
            const chat = await this.chatService.enableChat(chatId);
            if (chat) {
                res.status(200).json({ message: 'Chat habilitado con éxito', chat });
            } else {
                res.status(404).json({ message: 'Chat no encontrado' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async disableChat(req: Request, res: Response): Promise<void> {
        try {
            const chatId = parseInt(req.params.id, 10);
            const chat = await this.chatService.disableChat(chatId);
            if (chat) {
                res.status(200).json({ message: 'Chat deshabilitado con éxito', chat });
            } else {
                res.status(404).json({ message: 'Chat no encontrado' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}
