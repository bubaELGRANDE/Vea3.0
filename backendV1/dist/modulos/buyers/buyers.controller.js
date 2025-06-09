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
exports.BuyersController = void 0;
const buyers_service_1 = require("./buyers.service");
const buyers_model_1 = require("./buyers.model");
const class_validator_1 = require("class-validator");
class BuyersController {
    constructor() {
        this.buyersService = new buyers_service_1.BuyersService();
    }
    createBuyer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createBuyerDto = new buyers_model_1.CreateBuyerDto();
                createBuyerDto.userId = req.body.userId;
                createBuyerDto.phone = req.body.phone;
                const errors = yield (0, class_validator_1.validate)(createBuyerDto);
                if (errors.length > 0) {
                    res.status(400).json({ message: 'Validacion fallida', errors });
                    return;
                }
                const newBuyer = yield this.buyersService.createBuyer(createBuyerDto);
                res.status(201).json({
                    success: true,
                    data: newBuyer
                });
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    getAllBuyers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const buyers = yield this.buyersService.getAllBuyers();
                res.status(200).json(buyers);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    getBuyerById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id, 10);
                const buyer = yield this.buyersService.getBuyerById(id);
                if (buyer) {
                    res.status(200).json(buyer);
                }
                else {
                    res.status(404).json({ message: 'Comprador no encontrado' });
                }
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    updateBuyer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id, 10);
                if (isNaN(id)) {
                    res.status(400).json({ message: 'Formato de ID inválido' });
                    return;
                }
                const updateBuyerDto = new buyers_model_1.UpdateBuyerDto();
                if (req.body.userId !== undefined)
                    updateBuyerDto.userId = req.body.userId;
                if (req.body.phone !== undefined)
                    updateBuyerDto.phone = req.body.phone;
                const errors = yield (0, class_validator_1.validate)(updateBuyerDto, { skipMissingProperties: true });
                if (errors.length > 0) {
                    res.status(400).json({ message: 'Validacion fallida', errors });
                    return;
                }
                const updatedBuyer = yield this.buyersService.updateBuyer(id, updateBuyerDto);
                if (updatedBuyer) {
                    res.status(200).json(updatedBuyer);
                }
                else {
                    res.status(404).json({ message: 'Comprador no encontrado' });
                }
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    deleteBuyer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id, 10);
                const result = yield this.buyersService.deleteBuyer(id);
                if (result.affected && result.affected > 0) {
                    res.status(200).json({ message: 'Comprador eliminado con éxito' });
                }
                else {
                    res.status(404).json({ message: 'Comprador no encontrado o ya eliminado' });
                }
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
}
exports.BuyersController = BuyersController;
