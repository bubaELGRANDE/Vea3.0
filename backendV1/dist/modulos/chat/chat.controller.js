"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatController = void 0;
const chat_service_1 = require("./chat.service");
const chat_model_1 = require("./chat.model");
const data_source_1 = require("../../core/confi/data-source");
const Chat_1 = require("../../core/entity/Chat");
const Publishing_1 = require("../../core/entity/Publishing");
const Buyers_1 = require("../../core/entity/Buyers");
const Sellers_1 = require("../../core/entity/Sellers");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class ChatController {
    constructor() {
        const chatRepository = data_source_1.AppDataSource.getRepository(Chat_1.Chat);
        const publishingRepository = data_source_1.AppDataSource.getRepository(Publishing_1.Publishing);
        const buyersRepository = data_source_1.AppDataSource.getRepository(Buyers_1.Buyers);
        const sellersRepository = data_source_1.AppDataSource.getRepository(Sellers_1.Sellers);
        this.chatService = new chat_service_1.ChatService(chatRepository, publishingRepository, buyersRepository, sellersRepository);
    }
    createChat(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('=== DEBUG POST /chat ===');
                console.log('Request body:', req.body);
                const createChatDto = (0, class_transformer_1.plainToClass)(chat_model_1.CreateChatDto, req.body);
                console.log('DTO created:', createChatDto);
                const errors = yield (0, class_validator_1.validate)(createChatDto);
                console.log('Validation errors:', errors);
                if (errors.length > 0) {
                    console.log('Validation failed, returning 400');
                    res.status(400).json({ message: 'Validación fallida', errors });
                    return;
                }
                console.log('Calling chatService.createChat...');
                const chat = yield this.chatService.createChat(createChatDto);
                console.log('Chat created successfully:', chat);
                res.status(201).json(chat);
            }
            catch (error) {
                console.log('Chat service error:', error.message);
                console.log('Full error:', error);
                res.status(500).json({ message: error.message });
            }
        });
    }
    getChats(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const chats = yield this.chatService.getChats();
                res.status(200).json(chats);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    getChatById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const chatId = parseInt(req.params.id, 10);
                const chat = yield this.chatService.getChatById(chatId);
                if (chat) {
                    res.status(200).json(chat);
                }
                else {
                    res.status(404).json({ message: 'Chat no encontrado' });
                }
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    getChatsByBuyer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const buyerId = parseInt(req.params.buyerId, 10);
                const chats = yield this.chatService.getChatsByBuyer(buyerId);
                res.status(200).json(chats);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    getChatsBySeller(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sellerId = parseInt(req.params.sellerId, 10);
                const chats = yield this.chatService.getChatsBySeller(sellerId);
                res.status(200).json(chats);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    getChatsByPublishing(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const publishingId = parseInt(req.params.publishingId, 10);
                const chats = yield this.chatService.getChatsByPublishing(publishingId);
                res.status(200).json(chats);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    updateChat(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const chatId = parseInt(req.params.id, 10);
                const updateChatDto = (0, class_transformer_1.plainToClass)(chat_model_1.UpdateChatDto, req.body);
                const errors = yield (0, class_validator_1.validate)(updateChatDto);
                if (errors.length > 0) {
                    res.status(400).json({ message: 'Validación fallida', errors });
                    return;
                }
                const chat = yield this.chatService.updateChat(chatId, updateChatDto);
                if (chat) {
                    res.status(200).json(chat);
                }
                else {
                    res.status(404).json({ message: 'Chat no encontrado' });
                }
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    deleteChat(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const chatId = parseInt(req.params.id, 10);
                const result = yield this.chatService.deleteChat(chatId);
                if (result.affected && result.affected > 0) {
                    res.status(200).json({ message: 'Chat eliminado con éxito' });
                }
                else {
                    res.status(404).json({ message: 'Chat no encontrado o ya eliminado' });
                }
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    enableChat(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const chatId = parseInt(req.params.id, 10);
                const chat = yield this.chatService.enableChat(chatId);
                if (chat) {
                    res.status(200).json({ message: 'Chat habilitado con éxito', chat });
                }
                else {
                    res.status(404).json({ message: 'Chat no encontrado' });
                }
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    disableChat(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const chatId = parseInt(req.params.id, 10);
                const chat = yield this.chatService.disableChat(chatId);
                if (chat) {
                    res.status(200).json({ message: 'Chat deshabilitado con éxito', chat });
                }
                else {
                    res.status(404).json({ message: 'Chat no encontrado' });
                }
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
}
exports.ChatController = ChatController;
