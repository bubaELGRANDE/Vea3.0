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
exports.Sales = void 0;
const typeorm_1 = require("typeorm");
const Publishing_1 = require("./Publishing");
const Buyers_1 = require("./Buyers");
const SaleStatus_1 = require("./SaleStatus");
const Reviews_1 = require("./Reviews");
let Sales = class Sales {
};
exports.Sales = Sales;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Sales.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Publishing_1.Publishing, publishing => publishing.sales, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'publishingId' }),
    __metadata("design:type", Publishing_1.Publishing)
], Sales.prototype, "publishing", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Buyers_1.Buyers, buyer => buyer.sales, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'buyerId' }),
    __metadata("design:type", Buyers_1.Buyers)
], Sales.prototype, "buyer", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => SaleStatus_1.SaleStatus, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'statusId' }),
    __metadata("design:type", SaleStatus_1.SaleStatus)
], Sales.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Reviews_1.Reviews, review => review.sale),
    __metadata("design:type", Array)
], Sales.prototype, "reviews", void 0);
exports.Sales = Sales = __decorate([
    (0, typeorm_1.Entity)()
], Sales);
