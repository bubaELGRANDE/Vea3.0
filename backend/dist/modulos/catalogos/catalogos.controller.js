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
exports.CatalogosController = void 0;
const catalogos_service_1 = require("./catalogos.service");
class CatalogosController {
    constructor() {
        this.catalogosService = new catalogos_service_1.CatalogosService();
    }
    // Controladores para Categories
    getCategories(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categories = yield this.catalogosService.getCategories();
                res.json(categories);
            }
            catch (error) {
                res.status(500).send({ message: 'Error al recuperar las categorías', error });
            }
        });
    }
    getCategoryById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const category = yield this.catalogosService.getCategoryById(id);
                if (category) {
                    res.json(category);
                }
                else {
                    res.status(404).send({ message: 'Categoría no encontrada' });
                }
            }
            catch (error) {
                res.status(500).send({ message: 'Error al recuperar la categoría', error });
            }
        });
    }
    // Controladores para PublishingStatus
    getPublishingStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const publishingStatus = yield this.catalogosService.getPublishingStatus();
                res.json(publishingStatus);
            }
            catch (error) {
                res.status(500).send({ message: 'Error al recuperar el estado de publicación', error });
            }
        });
    }
    getPublishingStatusById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const status = yield this.catalogosService.getPublishingStatusById(id);
                if (status) {
                    res.json(status);
                }
                else {
                    res.status(404).send({ message: 'Estado de publicación no encontrado' });
                }
            }
            catch (error) {
                res.status(500).send({ message: 'Error al recuperar el estado de publicación', error });
            }
        });
    }
    // Controladores para SaleStatus
    getSaleStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const saleStatus = yield this.catalogosService.getSaleStatus();
                res.json(saleStatus);
            }
            catch (error) {
                res.status(500).send({ message: 'Error al recuperar el estado de venta', error });
            }
        });
    }
    getSaleStatusById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const status = yield this.catalogosService.getSaleStatusById(id);
                if (status) {
                    res.json(status);
                }
                else {
                    res.status(404).send({ message: 'Estado de venta no encontrado' });
                }
            }
            catch (error) {
                res.status(500).send({ message: 'Error al recuperar el estado de venta', error });
            }
        });
    }
    // Controladores para ArticleStatus
    getArticleStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const articleStatus = yield this.catalogosService.getArticleStatus();
                res.json(articleStatus);
            }
            catch (error) {
                res.status(500).send({ message: 'Error al recuperar el estado del artículo', error });
            }
        });
    }
    getArticleStatusById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const status = yield this.catalogosService.getArticleStatusById(id);
                if (status) {
                    res.json(status);
                }
                else {
                    res.status(404).send({ message: 'Estado de artículo no encontrado' });
                }
            }
            catch (error) {
                res.status(500).send({ message: 'Error al recuperar el estado del artículo', error });
            }
        });
    }
}
exports.CatalogosController = CatalogosController;
