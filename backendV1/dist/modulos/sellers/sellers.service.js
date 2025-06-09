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
exports.SellersService = void 0;
const data_source_1 = require("../../core/confi/data-source");
const Sellers_1 = require("../../core/entity/Sellers");
class SellersService {
    constructor() {
        this.sellersRepository = data_source_1.AppDataSource.getRepository(Sellers_1.Sellers);
    }
    createSeller(sellerData) {
        return __awaiter(this, void 0, void 0, function* () {
            const seller = this.sellersRepository.create(sellerData);
            return this.sellersRepository.save(seller);
        });
    }
    getAllSellers() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.sellersRepository.find({ relations: ['user', 'municipality'] });
        });
    }
    getSellerById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.sellersRepository.findOne({ where: { id }, relations: ['user', 'municipality'] });
        });
    }
    updateSeller(id, sellerData) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.sellersRepository.update(id, sellerData);
            return this.getSellerById(id);
        });
    }
    deleteSeller(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const result = yield this.sellersRepository.delete(id);
            return { affected: (_a = result.affected) !== null && _a !== void 0 ? _a : undefined };
        });
    }
}
exports.SellersService = SellersService;
