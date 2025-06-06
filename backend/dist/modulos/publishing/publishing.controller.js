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
exports.PublishingController = void 0;
const publishing_service_1 = require("./publishing.service");
class PublishingController {
    constructor() {
        this.publishingService = new publishing_service_1.PublishingService();
    }
    getAllPublishing(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const publishings = yield this.publishingService.getAllPublishing();
                res.status(200).json(publishings);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    getPublishingById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id, 10);
                const publishing = yield this.publishingService.getPublishingById(id);
                if (publishing) {
                    res.status(200).json(publishing);
                }
                else {
                    res.status(404).json({ message: 'Publicación no encontrada' });
                }
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    getPublishingBySeller(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sellerId = parseInt(req.params.sellerId, 10);
                const publishings = yield this.publishingService.getPublishingBySeller(sellerId);
                res.status(200).json(publishings);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    getPublishingByStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const statusId = parseInt(req.params.statusId, 10);
                const publishings = yield this.publishingService.getPublishingByStatus(statusId);
                res.status(200).json(publishings);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
}
exports.PublishingController = PublishingController;
