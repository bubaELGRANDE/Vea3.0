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
exports.BuyersService = void 0;
const data_source_1 = require("../../core/confi/data-source");
const Buyers_1 = require("../../core/entity/Buyers");
const Users_1 = require("../../core/entity/Users"); // Asegurarse de que Users esté importado
class BuyersService {
    constructor() {
        this.buyersRepository = data_source_1.AppDataSource.getRepository(Buyers_1.Buyers);
        this.usersRepository = data_source_1.AppDataSource.getRepository(Users_1.Users);
    }
    createBuyer(buyerDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, phone } = buyerDto;
            // Verificar si el usuario existe
            const user = yield this.usersRepository.findOneBy({ id: userId });
            if (!user) {
                throw new Error('Usuario no encontrado');
            }
            const buyer = new Buyers_1.Buyers();
            buyer.user = user;
            buyer.phone = phone;
            return this.buyersRepository.save(buyer);
        });
    }
    getAllBuyers() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.buyersRepository.find({ relations: ['user'] });
        });
    }
    getBuyerById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.buyersRepository.findOne({ where: { id }, relations: ['user'] });
        });
    }
    getBuyersByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.buyersRepository.find({ where: { user: { id: userId } }, relations: ['user'] });
        });
    }
    updateBuyer(id, buyerDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const buyerToUpdate = yield this.buyersRepository.findOneBy({ id });
            if (!buyerToUpdate) {
                return null;
            }
            if (buyerDto.userId !== undefined) {
                const user = yield this.usersRepository.findOneBy({ id: buyerDto.userId });
                if (!user) {
                    throw new Error('Usuario no encontrado para la actualización');
                }
                buyerToUpdate.user = user;
            }
            if (buyerDto.phone !== undefined) {
                buyerToUpdate.phone = buyerDto.phone;
            }
            yield this.buyersRepository.save(buyerToUpdate);
            return this.getBuyerById(id);
        });
    }
    deleteBuyer(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const result = yield this.buyersRepository.delete(id);
            return { affected: (_a = result.affected) !== null && _a !== void 0 ? _a : undefined };
        });
    }
}
exports.BuyersService = BuyersService;
