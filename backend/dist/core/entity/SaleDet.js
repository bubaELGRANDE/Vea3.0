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
exports.SaleDet = void 0;
const typeorm_1 = require("typeorm");
const Sales_1 = require("./Sales");
const Payload_1 = require("./Payload");
let SaleDet = class SaleDet {
};
exports.SaleDet = SaleDet;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SaleDet.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Sales_1.Sales, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'saleId' }),
    __metadata("design:type", Sales_1.Sales)
], SaleDet.prototype, "sale", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Payload_1.Payload, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'payloadId' }),
    __metadata("design:type", Payload_1.Payload)
], SaleDet.prototype, "payload", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        nullable: false
    }),
    __metadata("design:type", Number)
], SaleDet.prototype, "price", void 0);
exports.SaleDet = SaleDet = __decorate([
    (0, typeorm_1.Entity)()
], SaleDet);
