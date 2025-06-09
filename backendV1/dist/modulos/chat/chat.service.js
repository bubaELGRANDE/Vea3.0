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
exports.ChatService = void 0;
class ChatService {
    constructor(chatRepository, publishingRepository, buyersRepository, sellersRepository) {
        this.chatRepository = chatRepository;
        this.publishingRepository = publishingRepository;
        this.buyersRepository = buyersRepository;
        this.sellersRepository = sellersRepository;
    }
    createChat(createChatDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { publishingId, buyerId, sellerId, isEnable } = createChatDto;
            // Verificar que la publicación existe
            const publishing = yield this.publishingRepository.findOneBy({ id: publishingId });
            if (!publishing) {
                throw new Error(`La publicación con ID ${publishingId} no fue encontrada`);
            } // Verificar que el comprador existe
            const buyer = yield this.buyersRepository.findOneBy({ id: buyerId });
            if (!buyer) {
                throw new Error(`El comprador con ID ${buyerId} no fue encontrado`);
            }
            // Verificar que el vendedor existe
            const seller = yield this.sellersRepository.findOneBy({ id: sellerId });
            if (!seller) {
                throw new Error(`El vendedor con ID ${sellerId} no fue encontrado`);
            } // Verificar que no existe ya un chat para esta combinación
            const existingChat = yield this.chatRepository.findOne({
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
        });
    }
    getChats() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.chatRepository.find({
                relations: ['publishing', 'buyer', 'seller']
            });
        });
    }
    getChatById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.chatRepository.findOne({
                where: { id },
                relations: ['publishing', 'buyer', 'seller']
            });
        });
    }
    getChatsByBuyer(buyerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.chatRepository.find({
                where: { buyer: { id: buyerId } },
                relations: ['publishing', 'buyer', 'seller']
            });
        });
    }
    getChatsBySeller(sellerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.chatRepository.find({
                where: { seller: { id: sellerId } },
                relations: ['publishing', 'buyer', 'seller']
            });
        });
    }
    getChatsByPublishing(publishingId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.chatRepository.find({
                where: { publishing: { id: publishingId } },
                relations: ['publishing', 'buyer', 'seller']
            });
        });
    }
    updateChat(id, updateChatDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const chatToUpdate = yield this.chatRepository.findOneBy({ id });
            if (!chatToUpdate) {
                return null;
            }
            const { publishingId, buyerId, sellerId, isEnable } = updateChatDto;
            if (publishingId) {
                const publishing = yield this.publishingRepository.findOneBy({ id: publishingId });
                if (!publishing) {
                    throw new Error(`La publicación con ID ${publishingId} no fue encontrada`);
                }
                chatToUpdate.publishing = publishing;
            }
            if (buyerId) {
                const buyer = yield this.buyersRepository.findOneBy({ id: buyerId });
                if (!buyer) {
                    throw new Error(`El comprador con ID ${buyerId} no fue encontrado`);
                }
                chatToUpdate.buyer = buyer;
            }
            if (sellerId) {
                const seller = yield this.sellersRepository.findOneBy({ id: sellerId });
                if (!seller) {
                    throw new Error(`El vendedor con ID ${sellerId} no fue encontrado`);
                }
                chatToUpdate.seller = seller;
            }
            if (isEnable !== undefined) {
                chatToUpdate.isEnable = isEnable;
            }
            return this.chatRepository.save(chatToUpdate);
        });
    }
    deleteChat(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const result = yield this.chatRepository.delete(id);
            return { affected: (_a = result.affected) !== null && _a !== void 0 ? _a : null };
        });
    }
    enableChat(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const chat = yield this.chatRepository.findOneBy({ id });
            if (!chat) {
                return null;
            }
            chat.isEnable = true;
            return this.chatRepository.save(chat);
        });
    }
    disableChat(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const chat = yield this.chatRepository.findOneBy({ id });
            if (!chat) {
                return null;
            }
            chat.isEnable = false;
            return this.chatRepository.save(chat);
        });
    }
}
exports.ChatService = ChatService;
