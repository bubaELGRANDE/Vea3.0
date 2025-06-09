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
exports.SalesController = void 0;
const sales_service_1 = require("./sales.service");
const sales_model_1 = require("./sales.model");
const data_source_1 = require("../../core/confi/data-source");
const Sales_1 = require("../../core/entity/Sales");
const Publishing_1 = require("../../core/entity/Publishing");
const Buyers_1 = require("../../core/entity/Buyers");
const SaleStatus_1 = require("../../core/entity/SaleStatus");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class SalesController {
    constructor() {
        const salesRepository = data_source_1.AppDataSource.getRepository(Sales_1.Sales);
        const publishingRepository = data_source_1.AppDataSource.getRepository(Publishing_1.Publishing);
        const buyersRepository = data_source_1.AppDataSource.getRepository(Buyers_1.Buyers);
        const saleStatusRepository = data_source_1.AppDataSource.getRepository(SaleStatus_1.SaleStatus);
        this.salesService = new sales_service_1.SalesService(salesRepository, publishingRepository, buyersRepository, saleStatusRepository);
    }
    createSale(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createSaleDto = (0, class_transformer_1.plainToClass)(sales_model_1.CreateSaleDto, req.body);
                const errors = yield (0, class_validator_1.validate)(createSaleDto);
                if (errors.length > 0) {
                    res.status(400).json({ message: 'Validación fallida', errors });
                    return;
                }
                const sale = yield this.salesService.createSale(createSaleDto);
                res.status(201).json(sale);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    getSales(res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sales = yield this.salesService.getSales();
                res.status(200).json(sales);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    getSaleById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const saleId = parseInt(req.params.id, 10);
                const sale = yield this.salesService.getSaleById(saleId);
                if (sale) {
                    res.status(200).json(sale);
                }
                else {
                    res.status(404).json({ message: 'Venta no encontrada' });
                }
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    updateSale(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const saleId = parseInt(req.params.id, 10);
                const updateSaleDto = (0, class_transformer_1.plainToClass)(sales_model_1.UpdateSaleDto, req.body);
                const errors = yield (0, class_validator_1.validate)(updateSaleDto);
                if (errors.length > 0) {
                    res.status(400).json({ message: 'Validación fallida', errors });
                    return;
                }
                const sale = yield this.salesService.updateSale(saleId, updateSaleDto);
                if (sale) {
                    res.status(200).json(sale);
                }
                else {
                    res.status(404).json({ message: 'Venta no encontrada' });
                }
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    deleteSale(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const saleId = parseInt(req.params.id, 10);
                const result = yield this.salesService.deleteSale(saleId);
                if (result.affected && result.affected > 0) {
                    res.status(200).json({ message: 'Venta eliminada con éxito' });
                }
                else {
                    res.status(404).json({ message: 'Venta no encontrada o ya eliminada' });
                }
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
}
exports.SalesController = SalesController;
