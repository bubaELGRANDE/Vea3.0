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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
class ProductService {
    constructor(publishingRepository, publishingStatusRepository, sellersRepository) {
        this.publishingRepository = publishingRepository;
        this.publishingStatusRepository = publishingStatusRepository;
        this.sellersRepository = sellersRepository;
    }
    createProduct(createProductDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, description, price, type, statusId, sellerId } = createProductDto;
            const status = yield this.publishingStatusRepository.findOneBy({ id: statusId });
            if (!status) {
                throw new Error(`El estado con el id ${statusId} no fue encontrado`);
            }
            const seller = yield this.sellersRepository.findOneBy({ id: sellerId });
            if (!seller) {
                throw new Error(`El vendedor con el id ${sellerId} no fue encontrado`);
            }
            const newPublishing = this.publishingRepository.create({
                title,
                description,
                price,
                type,
                status: status,
                seller: seller,
            });
            const savedPublishing = yield this.publishingRepository.save(newPublishing);
            return savedPublishing;
        });
    }
    getProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.publishingRepository.find({
                    relations: [
                        'status',
                        'seller',
                        'seller.user'
                    ]
                });
            }
            catch (error) {
                console.log(error);
                return [];
            }
        });
    }
    getProductsFront() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.publishingRepository
                    .createQueryBuilder('publishing')
                    .leftJoinAndSelect('publishing.status', 'status')
                    .leftJoinAndSelect('publishing.seller', 'seller')
                    .leftJoin('seller.user', 'user')
                    .addSelect(['user.name', 'user.img', 'user.email'])
                    .getMany();
            }
            catch (error) {
                console.error(error);
                return [];
            }
        });
    }
    getProductById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.publishingRepository.findOne({
                where: { id },
                relations: ['status', 'seller']
            });
        });
    }
    getProductBySellerId(sellerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.publishingRepository.find({
                where: { seller: { id: sellerId } },
                relations: ['status', 'seller']
            });
        });
    }
    updateProduct(id, updateProductDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const productToUpdate = yield this.publishingRepository.findOneBy({ id });
            if (!productToUpdate) {
                return null;
            }
            const { statusId, sellerId, price } = updateProductDto, publishingData = __rest(updateProductDto, ["statusId", "sellerId", "price"]);
            if (statusId) {
                const status = yield this.publishingStatusRepository.findOneBy({ id: statusId });
                if (!status)
                    throw new Error(`El estado con el id ${statusId} no fue encontrado`);
                productToUpdate.status = status;
            }
            if (sellerId) {
                const seller = yield this.sellersRepository.findOneBy({ id: sellerId });
                if (!seller)
                    throw new Error(`El vendedor con el id ${sellerId} no fue encontrado`);
                productToUpdate.seller = seller;
            }
            if (price !== undefined) {
                productToUpdate.price = price;
            }
            Object.assign(productToUpdate, publishingData);
            const updatedPublishing = yield this.publishingRepository.save(productToUpdate);
            return updatedPublishing;
        });
    }
    deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const result = yield this.publishingRepository.delete(id);
            return { affected: (_a = result.affected) !== null && _a !== void 0 ? _a : null };
        });
    }
    getProductsAllInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.publishingRepository
                    .createQueryBuilder('publishing')
                    .leftJoinAndSelect('publishing.status', 'status')
                    .leftJoinAndSelect('publishing.seller', 'seller')
                    .leftJoin('seller.user', 'user')
                    .addSelect(['user.name', 'user.img', 'user.email'])
                    // Imágenes
                    .leftJoinAndSelect('publishing.images', 'images')
                    // Categorías a través de PublishingCategories
                    .leftJoinAndSelect('publishing.publishingCategories', 'publishingCategories')
                    .leftJoinAndSelect('publishingCategories.category', 'category')
                    .getMany();
            }
            catch (error) {
                console.error('Error al obtener productos:', error);
                return [];
            }
        });
    }
}
exports.ProductService = ProductService;
