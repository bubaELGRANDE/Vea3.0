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
exports.Sellers = void 0;
const typeorm_1 = require("typeorm");
const Users_1 = require("./Users");
const Municipalities_1 = require("./Municipalities");
const Publishing_1 = require("./Publishing");
const Chat_1 = require("./Chat");
let Sellers = class Sellers {
};
exports.Sellers = Sellers;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Sellers.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, user => user.sellers, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", Users_1.Users)
], Sellers.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        nullable: false
    }),
    __metadata("design:type", String)
], Sellers.prototype, "direction", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Municipalities_1.Municipalities, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'municipalityId' }),
    __metadata("design:type", Municipalities_1.Municipalities)
], Sellers.prototype, "municipality", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 10,
        nullable: false
    }),
    __metadata("design:type", String)
], Sellers.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
        precision: 3,
        scale: 2,
        nullable: false,
        default: 0.00
    }),
    __metadata("design:type", Number)
], Sellers.prototype, "score", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Publishing_1.Publishing, publishing => publishing.seller),
    __metadata("design:type", Array)
], Sellers.prototype, "publications", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Chat_1.Chat, chat => chat.seller),
    __metadata("design:type", Array)
], Sellers.prototype, "chats", void 0);
exports.Sellers = Sellers = __decorate([
    (0, typeorm_1.Entity)()
], Sellers);
