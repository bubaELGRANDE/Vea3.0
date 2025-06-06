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
exports.SalesService = void 0;
class SalesService {
    constructor(salesRepository, publishingRepository, buyersRepository, saleStatusRepository) {
        this.salesRepository = salesRepository;
        this.publishingRepository = publishingRepository;
        this.buyersRepository = buyersRepository;
        this.saleStatusRepository = saleStatusRepository;
    }
    createSale(createSaleDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { publishingId, buyerId, statusId } = createSaleDto;
            const publishing = yield this.publishingRepository.findOneBy({ id: publishingId });
            if (!publishing) {
                throw new Error(`La publicación con ID ${publishingId} no fue encontrada`);
            }
            const buyer = yield this.buyersRepository.findOneBy({ id: buyerId });
            if (!buyer) {
                throw new Error(`El comprador con ID ${buyerId} no fue encontrado`);
            }
            const status = yield this.saleStatusRepository.findOneBy({ id: statusId });
            if (!status) {
                throw new Error(`El estado con ID ${statusId} no fue encontrado`);
            }
            const newSale = this.salesRepository.create({
                publishing: publishing,
                buyer: buyer,
                status: status
            });
            return this.salesRepository.save(newSale);
        });
    }
    getSales() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.salesRepository.find({
                relations: ['publishing', 'buyer', 'status']
            });
        });
    }
    getSaleById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.salesRepository.findOne({
                where: { id },
                relations: ['publishing', 'buyer', 'status']
            });
        });
    }
    updateSale(id, updateSaleDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const saleToUpdate = yield this.salesRepository.findOneBy({ id });
            if (!saleToUpdate) {
                return null;
            }
            const { publishingId, buyerId, statusId } = updateSaleDto;
            if (publishingId) {
                const publishing = yield this.publishingRepository.findOneBy({ id: publishingId });
                if (!publishing) {
                    throw new Error(`La publicación con ID ${publishingId} no fue encontrada`);
                }
                saleToUpdate.publishing = publishing;
            }
            if (buyerId) {
                const buyer = yield this.buyersRepository.findOneBy({ id: buyerId });
                if (!buyer) {
                    throw new Error(`El comprador con ID ${buyerId} no fue encontrado`);
                }
                saleToUpdate.buyer = buyer;
            }
            if (statusId) {
                const status = yield this.saleStatusRepository.findOneBy({ id: statusId });
                if (!status) {
                    throw new Error(`El estado con ID ${statusId} no fue encontrado`);
                }
                saleToUpdate.status = status;
            }
            return this.salesRepository.save(saleToUpdate);
        });
    }
    deleteSale(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const result = yield this.salesRepository.delete(id);
            return { affected: (_a = result.affected) !== null && _a !== void 0 ? _a : null };
        });
    }
}
exports.SalesService = SalesService;
