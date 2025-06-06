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
exports.UserSession = exports.UserLoginAttempt = exports.UserPasswordReset = exports.UserRefreshToken = void 0;
const typeorm_1 = require("typeorm");
const Users_1 = require("./Users");
let UserRefreshToken = class UserRefreshToken {
};
exports.UserRefreshToken = UserRefreshToken;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], UserRefreshToken.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, user => user.refreshTokens, {
        onDelete: 'CASCADE',
        eager: false
    }),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", Users_1.Users)
], UserRefreshToken.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'userId' }),
    __metadata("design:type", Number)
], UserRefreshToken.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        nullable: false,
        name: 'token_hash'
    }),
    __metadata("design:type", String)
], UserRefreshToken.prototype, "tokenHash", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 100,
        nullable: true,
        name: 'device_info'
    }),
    __metadata("design:type", String)
], UserRefreshToken.prototype, "deviceInfo", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 45,
        nullable: true,
        name: 'ip_address'
    }),
    __metadata("design:type", String)
], UserRefreshToken.prototype, "ipAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 500,
        nullable: true,
        name: 'user_agent'
    }),
    __metadata("design:type", String)
], UserRefreshToken.prototype, "userAgent", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamp',
        nullable: false,
        name: 'expires_at'
    }),
    __metadata("design:type", Date)
], UserRefreshToken.prototype, "expiresAt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamp',
        nullable: true,
        name: 'last_used_at'
    }),
    __metadata("design:type", Date)
], UserRefreshToken.prototype, "lastUsedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'boolean',
        default: true,
        name: 'is_active'
    }),
    __metadata("design:type", Boolean)
], UserRefreshToken.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], UserRefreshToken.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], UserRefreshToken.prototype, "updatedAt", void 0);
exports.UserRefreshToken = UserRefreshToken = __decorate([
    (0, typeorm_1.Entity)('user_refresh_tokens'),
    (0, typeorm_1.Index)(['userId', 'tokenHash'], { unique: false }),
    (0, typeorm_1.Index)(['expiresAt'])
], UserRefreshToken);
let UserPasswordReset = class UserPasswordReset {
};
exports.UserPasswordReset = UserPasswordReset;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], UserPasswordReset.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 100,
        nullable: false
    }),
    __metadata("design:type", String)
], UserPasswordReset.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        nullable: false
    }),
    __metadata("design:type", String)
], UserPasswordReset.prototype, "token", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamp',
        nullable: false,
        name: 'expires_at'
    }),
    __metadata("design:type", Date)
], UserPasswordReset.prototype, "expiresAt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'boolean',
        default: false,
        name: 'is_used'
    }),
    __metadata("design:type", Boolean)
], UserPasswordReset.prototype, "isUsed", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 45,
        nullable: true,
        name: 'ip_address'
    }),
    __metadata("design:type", String)
], UserPasswordReset.prototype, "ipAddress", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], UserPasswordReset.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], UserPasswordReset.prototype, "updatedAt", void 0);
exports.UserPasswordReset = UserPasswordReset = __decorate([
    (0, typeorm_1.Entity)('user_password_resets'),
    (0, typeorm_1.Index)(['token'], { unique: true }),
    (0, typeorm_1.Index)(['email']),
    (0, typeorm_1.Index)(['expiresAt'])
], UserPasswordReset);
let UserLoginAttempt = class UserLoginAttempt {
};
exports.UserLoginAttempt = UserLoginAttempt;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserLoginAttempt.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 100,
        nullable: false
    }),
    __metadata("design:type", String)
], UserLoginAttempt.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 45,
        nullable: false,
        name: 'ip_address'
    }),
    __metadata("design:type", String)
], UserLoginAttempt.prototype, "ipAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 500,
        nullable: true,
        name: 'user_agent'
    }),
    __metadata("design:type", String)
], UserLoginAttempt.prototype, "userAgent", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'boolean',
        default: false,
        name: 'is_successful'
    }),
    __metadata("design:type", Boolean)
], UserLoginAttempt.prototype, "isSuccessful", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        nullable: true,
        name: 'failure_reason'
    }),
    __metadata("design:type", String)
], UserLoginAttempt.prototype, "failureReason", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], UserLoginAttempt.prototype, "createdAt", void 0);
exports.UserLoginAttempt = UserLoginAttempt = __decorate([
    (0, typeorm_1.Entity)('user_login_attempts'),
    (0, typeorm_1.Index)(['email']),
    (0, typeorm_1.Index)(['ipAddress']),
    (0, typeorm_1.Index)(['createdAt'])
], UserLoginAttempt);
let UserSession = class UserSession {
};
exports.UserSession = UserSession;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], UserSession.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", Users_1.Users)
], UserSession.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'userId' }),
    __metadata("design:type", Number)
], UserSession.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        nullable: false,
        name: 'token_hash'
    }),
    __metadata("design:type", String)
], UserSession.prototype, "tokenHash", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 100,
        nullable: true,
        name: 'device_info'
    }),
    __metadata("design:type", String)
], UserSession.prototype, "deviceInfo", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 45,
        nullable: true,
        name: 'ip_address'
    }),
    __metadata("design:type", String)
], UserSession.prototype, "ipAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 500,
        nullable: true,
        name: 'user_agent'
    }),
    __metadata("design:type", String)
], UserSession.prototype, "userAgent", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamp',
        nullable: false,
        name: 'expires_at'
    }),
    __metadata("design:type", Date)
], UserSession.prototype, "expiresAt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamp',
        nullable: true,
        name: 'last_activity_at'
    }),
    __metadata("design:type", Date)
], UserSession.prototype, "lastActivityAt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'boolean',
        default: true,
        name: 'is_active'
    }),
    __metadata("design:type", Boolean)
], UserSession.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], UserSession.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], UserSession.prototype, "updatedAt", void 0);
exports.UserSession = UserSession = __decorate([
    (0, typeorm_1.Entity)('user_sessions'),
    (0, typeorm_1.Index)(['userId']),
    (0, typeorm_1.Index)(['tokenHash']),
    (0, typeorm_1.Index)(['expiresAt'])
], UserSession);
