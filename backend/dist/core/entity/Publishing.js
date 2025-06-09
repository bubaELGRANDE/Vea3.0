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
exports.Publishing = void 0;
const typeorm_1 = require("typeorm");
const PublishingStatus_1 = require("./PublishingStatus");
const Sellers_1 = require("./Sellers");
const Sales_1 = require("./Sales");
const Chat_1 = require("./Chat");
let Publishing = class Publishing {
};
exports.Publishing = Publishing;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Publishing.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => PublishingStatus_1.PublishingStatus, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'statusId' }),
    __metadata("design:type", PublishingStatus_1.PublishingStatus)
], Publishing.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Sellers_1.Sellers, seller => seller.publications, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'sellerId' }),
    __metadata("design:type", Sellers_1.Sellers)
], Publishing.prototype, "seller", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'char',
        length: 25,
        nullable: false
    }),
    __metadata("design:type", String)
], Publishing.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        nullable: false
    }),
    __metadata("design:type", String)
], Publishing.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: false
    }),
    __metadata("design:type", Number)
], Publishing.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        nullable: false
    }),
    __metadata("design:type", Number)
], Publishing.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Sales_1.Sales, sale => sale.publishing),
    __metadata("design:type", Array)
], Publishing.prototype, "sales", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Chat_1.Chat, chat => chat.publishing),
    __metadata("design:type", Array)
], Publishing.prototype, "chats", void 0);
exports.Publishing = Publishing = __decorate([
    (0, typeorm_1.Entity)()
], Publishing);
