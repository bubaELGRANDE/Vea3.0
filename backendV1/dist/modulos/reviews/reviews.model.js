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
exports.UpdateReviewDto = exports.CreateReviewDto = void 0;
const class_validator_1 = require("class-validator");
class CreateReviewDto {
}
exports.CreateReviewDto = CreateReviewDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El ID de la venta es obligatorio' }),
    (0, class_validator_1.IsNumber)({}, { message: 'El ID de la venta debe ser un número' }),
    __metadata("design:type", Number)
], CreateReviewDto.prototype, "saleId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'La reseña es obligatoria' }),
    (0, class_validator_1.IsString)({ message: 'La reseña debe ser una cadena de texto' }),
    (0, class_validator_1.MaxLength)(1000, { message: 'La reseña no puede exceder los 1000 caracteres' }),
    __metadata("design:type", String)
], CreateReviewDto.prototype, "review", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'La calificación es obligatoria' }),
    (0, class_validator_1.IsNumber)({}, { message: 'La calificación debe ser un número' }),
    (0, class_validator_1.Min)(1, { message: 'La calificación mínima es 1' }),
    (0, class_validator_1.Max)(5, { message: 'La calificación máxima es 5' }),
    __metadata("design:type", Number)
], CreateReviewDto.prototype, "rating", void 0);
class UpdateReviewDto {
}
exports.UpdateReviewDto = UpdateReviewDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({}, { message: 'El ID de la venta debe ser un número' }),
    __metadata("design:type", Number)
], UpdateReviewDto.prototype, "saleId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'La reseña debe ser una cadena de texto' }),
    __metadata("design:type", String)
], UpdateReviewDto.prototype, "review", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({}, { message: 'La calificación debe ser un número' }),
    (0, class_validator_1.Min)(1, { message: 'La calificación mínima es 1' }),
    (0, class_validator_1.Max)(5, { message: 'La calificación máxima es 5' }),
    __metadata("design:type", Number)
], UpdateReviewDto.prototype, "rating", void 0);
