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
exports.PublishingService = void 0;
const data_source_1 = require("../../core/confi/data-source");
const Publishing_1 = require("../../core/entity/Publishing");
const PublishingStatus_1 = require("../../core/entity/PublishingStatus");
const Sellers_1 = require("../../core/entity/Sellers");
class PublishingService {
    constructor() {
        this.publishingRepository = data_source_1.AppDataSource.getRepository(Publishing_1.Publishing);
        this.publishingStatusRepository = data_source_1.AppDataSource.getRepository(PublishingStatus_1.PublishingStatus);
        this.sellersRepository = data_source_1.AppDataSource.getRepository(Sellers_1.Sellers);
    }
    getAllPublishing() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.publishingRepository.find({
                relations: ['status', 'seller']
            });
        });
    }
    getPublishingById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.publishingRepository.findOne({
                where: { id },
                relations: ['status', 'seller']
            });
        });
    }
    getPublishingBySeller(sellerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.publishingRepository.find({
                where: { seller: { id: sellerId } },
                relations: ['status', 'seller']
            });
        });
    }
    getPublishingByStatus(statusId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.publishingRepository.find({
                where: { status: { id: statusId } },
                relations: ['status', 'seller']
            });
        });
    }
}
exports.PublishingService = PublishingService;
