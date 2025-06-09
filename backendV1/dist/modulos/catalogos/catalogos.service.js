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
exports.CatalogosService = void 0;
const data_source_1 = require("../../core/confi/data-source");
const Categories_1 = require("../../core/entity/Categories");
const PublishingStatus_1 = require("../../core/entity/PublishingStatus");
const SaleStatus_1 = require("../../core/entity/SaleStatus");
const ArticleStatus_1 = require("../../core/entity/ArticleStatus");
class CatalogosService {
    constructor() {
        this.categoriesRepository = data_source_1.AppDataSource.getRepository(Categories_1.Categories);
        this.publishingStatusRepository = data_source_1.AppDataSource.getRepository(PublishingStatus_1.PublishingStatus);
        this.saleStatusRepository = data_source_1.AppDataSource.getRepository(SaleStatus_1.SaleStatus);
        this.articleStatusRepository = data_source_1.AppDataSource.getRepository(ArticleStatus_1.ArticleStatus);
    }
    // GET para Categories
    getCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.categoriesRepository.find();
        });
    }
    getCategoryById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.categoriesRepository.findOne({ where: { id } });
        });
    }
    // GET para PublishingStatus
    getPublishingStatus() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.publishingStatusRepository.find();
        });
    }
    getPublishingStatusById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.publishingStatusRepository.findOne({ where: { id } });
        });
    }
    // GET para SaleStatus
    getSaleStatus() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.saleStatusRepository.find();
        });
    }
    getSaleStatusById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.saleStatusRepository.findOne({ where: { id } });
        });
    }
    // GET para ArticleStatus
    getArticleStatus() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.articleStatusRepository.find();
        });
    }
    getArticleStatusById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.articleStatusRepository.findOne({ where: { id } });
        });
    }
}
exports.CatalogosService = CatalogosService;
