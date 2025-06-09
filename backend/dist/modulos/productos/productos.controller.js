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
exports.ProductController = void 0;
const productos_service_1 = require("./productos.service");
const productos_model_1 = require("./productos.model");
const data_source_1 = require("../../core/confi/data-source");
const Publishing_1 = require("../../core/entity/Publishing");
const PublishingStatus_1 = require("../../core/entity/PublishingStatus");
const Sellers_1 = require("../../core/entity/Sellers");
const Categories_1 = require("../../core/entity/Categories");
const PublishingCategories_1 = require("../../core/entity/PublishingCategories");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class ProductController {
    constructor() {
        const publishingRepository = data_source_1.AppDataSource.getRepository(Publishing_1.Publishing);
        const publishingStatusRepository = data_source_1.AppDataSource.getRepository(PublishingStatus_1.PublishingStatus);
        const sellersRepository = data_source_1.AppDataSource.getRepository(Sellers_1.Sellers);
        const categoriesRepository = data_source_1.AppDataSource.getRepository(Categories_1.Categories);
        const publishingCategoriesRepository = data_source_1.AppDataSource.getRepository(PublishingCategories_1.PublishingCategories);
        this.productService = new productos_service_1.ProductService(publishingRepository, publishingStatusRepository, sellersRepository);
    }
    createProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createProductDto = (0, class_transformer_1.plainToClass)(productos_model_1.CreateProductDto, req.body);
                const errors = yield (0, class_validator_1.validate)(createProductDto);
                if (errors.length > 0) {
                    res.status(400).json({ message: 'Validación fallida', errors });
                    return;
                }
                const product = yield this.productService.createProduct(createProductDto);
                res.status(201).json(product);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    getProducts(res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield this.productService.getProducts();
                res.status(200).json(products);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    getProductsAllInfo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield this.productService.getProductsFront();
                res.status(200).json(products);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    getProductsForm(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield this.productService.getProductsFront();
                res.status(200).json(products);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    getProductById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productId = parseInt(req.params.id, 10);
                const product = yield this.productService.getProductById(productId);
                if (product) {
                    res.status(200).json(product);
                }
                else {
                    res.status(404).json({ message: 'Product not found' });
                }
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    updateProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productId = parseInt(req.params.id, 10);
                const updateProductDto = (0, class_transformer_1.plainToClass)(productos_model_1.UpdateProductDto, req.body);
                const errors = yield (0, class_validator_1.validate)(updateProductDto);
                if (errors.length > 0) {
                    res.status(400).json({ message: 'Validación fallida', errors });
                    return;
                }
                const product = yield this.productService.updateProduct(productId, updateProductDto);
                if (product) {
                    res.status(200).json(product);
                }
                else {
                    res.status(404).json({ message: 'Product not found' });
                }
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    getProductsBySellerID(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sellerId = parseInt(req.params.id, 10);
                const products = yield this.productService.getProductBySellerId(sellerId);
                res.status(200).json(products);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    deleteProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productId = parseInt(req.params.id, 10);
                const result = yield this.productService.deleteProduct(productId);
                if (result.affected && result.affected > 0) {
                    res.status(200).json({ message: 'Producto eliminado con éxito' });
                }
                else {
                    res.status(404).json({ message: 'Producto no encontrado o ya eliminado' });
                }
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
}
exports.ProductController = ProductController;
