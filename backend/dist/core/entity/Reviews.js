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
exports.Reviews = void 0;
const typeorm_1 = require("typeorm");
const Sales_1 = require("./Sales");
let Reviews = class Reviews {
};
exports.Reviews = Reviews;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Reviews.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Sales_1.Sales, sale => sale.reviews, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'saleId' }),
    __metadata("design:type", Sales_1.Sales)
], Reviews.prototype, "sale", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        nullable: false
    }),
    __metadata("design:type", String)
], Reviews.prototype, "review", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        nullable: false
    }),
    __metadata("design:type", Number)
], Reviews.prototype, "rating", void 0);
exports.Reviews = Reviews = __decorate([
    (0, typeorm_1.Entity)()
], Reviews);
