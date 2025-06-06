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
exports.Chat = void 0;
const typeorm_1 = require("typeorm");
const Publishing_1 = require("./Publishing");
const Buyers_1 = require("./Buyers");
const Sellers_1 = require("./Sellers");
let Chat = class Chat {
};
exports.Chat = Chat;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Chat.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Publishing_1.Publishing, publishing => publishing.chats, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'publishingId' }),
    __metadata("design:type", Publishing_1.Publishing)
], Chat.prototype, "publishing", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Buyers_1.Buyers, buyer => buyer.chats, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'buyerId' }),
    __metadata("design:type", Buyers_1.Buyers)
], Chat.prototype, "buyer", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Sellers_1.Sellers, seller => seller.chats, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'sellerId' }),
    __metadata("design:type", Sellers_1.Sellers)
], Chat.prototype, "seller", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'boolean',
        nullable: false
    }),
    __metadata("design:type", Boolean)
], Chat.prototype, "isEnable", void 0);
exports.Chat = Chat = __decorate([
    (0, typeorm_1.Entity)()
], Chat);
