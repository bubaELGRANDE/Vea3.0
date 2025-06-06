"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublishingDesc = void 0;
const typeorm_1 = require("typeorm");
const Publishing_1 = require("./Publishing");
const ArticleStatus_1 = require("./ArticleStatus");
let PublishingDesc = class PublishingDesc {
};
exports.PublishingDesc = PublishingDesc;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PublishingDesc.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Publishing_1.Publishing, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'publishingId' }),
    __metadata("design:type", Publishing_1.Publishing)
], PublishingDesc.prototype, "publishing", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ArticleStatus_1.ArticleStatus, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'articleStatusId' }),
    __metadata("design:type", ArticleStatus_1.ArticleStatus)
], PublishingDesc.prototype, "articleStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
    }),
    __metadata("design:type", String)
], PublishingDesc.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'char',
        nullable: false
    }),
    __metadata("design:type", String)
], PublishingDesc.prototype, "sku", void 0);
exports.PublishingDesc = PublishingDesc = __decorate([
    (0, typeorm_1.Entity)()
], PublishingDesc);
