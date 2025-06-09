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
exports.Users = void 0;
const typeorm_1 = require("typeorm");
const Sellers_1 = require("./Sellers");
const Buyers_1 = require("./Buyers");
const RefreshToken_1 = require("./RefreshToken");
let Users = class Users {
};
exports.Users = Users;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Users.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        nullable: false
    }),
    __metadata("design:type", String)
], Users.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 30,
        nullable: false,
        unique: true
    }),
    __metadata("design:type", String)
], Users.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        nullable: false,
        default: 'https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png'
    }),
    __metadata("design:type", String)
], Users.prototype, "img", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        default: 0,
        name: 'token_version'
    }),
    __metadata("design:type", Number)
], Users.prototype, "tokenVersion", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 100,
        nullable: false,
        unique: true
    }),
    __metadata("design:type", String)
], Users.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        nullable: false,
        select: false // No incluir por defecto en las consultas por seguridad
    }),
    __metadata("design:type", String)
], Users.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'boolean',
        default: true,
        name: 'is_active'
    }),
    __metadata("design:type", Boolean)
], Users.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamp',
        nullable: true,
        name: 'last_login_at'
    }),
    __metadata("design:type", Date)
], Users.prototype, "lastLoginAt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        default: 0,
        name: 'failed_login_attempts'
    }),
    __metadata("design:type", Number)
], Users.prototype, "failedLoginAttempts", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamp',
        nullable: true,
        name: 'locked_until'
    }),
    __metadata("design:type", Date)
], Users.prototype, "lockedUntil", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamp',
        nullable: true,
        name: 'email_verified_at'
    }),
    __metadata("design:type", Date)
], Users.prototype, "emailVerifiedAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        name: 'created_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    }),
    __metadata("design:type", Date)
], Users.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        name: 'updated_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP'
    }),
    __metadata("design:type", Date)
], Users.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Sellers_1.Sellers, seller => seller.user, { cascade: true }),
    __metadata("design:type", Array)
], Users.prototype, "sellers", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Buyers_1.Buyers, buyer => buyer.user, { cascade: true }),
    __metadata("design:type", Array)
], Users.prototype, "buyers", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => RefreshToken_1.RefreshToken, token => token.user, { cascade: true }),
    __metadata("design:type", Array)
], Users.prototype, "refreshTokens", void 0);
exports.Users = Users = __decorate([
    (0, typeorm_1.Entity)('users'),
    (0, typeorm_1.Index)(['email'], { unique: true }),
    (0, typeorm_1.Index)(['username'], { unique: true }),
    (0, typeorm_1.Index)(['isActive'])
], Users);
