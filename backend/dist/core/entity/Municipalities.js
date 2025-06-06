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
exports.Municipalities = void 0;
const typeorm_1 = require("typeorm");
const Departments_1 = require("./Departments");
let Municipalities = class Municipalities {
};
exports.Municipalities = Municipalities;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Municipalities.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Departments_1.Departments, (departments) => departments.municipalities, {
        nullable: false
    }),
    (0, typeorm_1.JoinColumn)({ name: 'department_id' }),
    __metadata("design:type", Departments_1.Departments)
], Municipalities.prototype, "department", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'char',
        length: 50,
        nullable: false
    }),
    __metadata("design:type", String)
], Municipalities.prototype, "municipalityName", void 0);
exports.Municipalities = Municipalities = __decorate([
    (0, typeorm_1.Entity)('municipalities'),
    (0, typeorm_1.Unique)(['municipalityName', 'department'])
], Municipalities);
