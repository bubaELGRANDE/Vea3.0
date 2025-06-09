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
exports.SellersController = void 0;
const sellers_service_1 = require("./sellers.service");
class SellersController {
    constructor() {
        this.sellersService = new sellers_service_1.SellersService();
    }
    createSeller(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sellerData = req.body;
                const newSeller = yield this.sellersService.createSeller(sellerData);
                res.status(201).json(newSeller);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    getAllSellers(res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sellers = yield this.sellersService.getAllSellers();
                res.status(200).json(sellers);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    getSellerById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id, 10);
                const seller = yield this.sellersService.getSellerById(id);
                if (seller) {
                    res.status(200).json(seller);
                }
                else {
                    res.status(404).json({ message: 'Vendedor no encontrado' });
                }
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    updateSeller(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id, 10);
                const sellerData = req.body;
                const updatedSeller = yield this.sellersService.updateSeller(id, sellerData);
                if (updatedSeller) {
                    res.status(200).json(updatedSeller);
                }
                else {
                    res.status(404).json({ message: 'Vendedor no encontrado' });
                }
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    deleteSeller(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id, 10);
                const result = yield this.sellersService.deleteSeller(id);
                if (result.affected && result.affected > 0) {
                    res.status(200).json({ message: 'Vendedor eliminado con éxito' });
                }
                else {
                    res.status(404).json({ message: 'Vendedor no encontrado o ya fue eliminado' });
                }
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
}
exports.SellersController = SellersController;
