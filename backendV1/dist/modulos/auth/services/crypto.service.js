"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
class CryptoService {
    /**
     * Hashea una contraseña con salt y pepper
     */
    static hashPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            const pepperedPassword = password + this.PEPPER;
            return bcrypt_1.default.hash(pepperedPassword, this.SALT_ROUNDS);
        });
    }
    /**
     * Verifica una contraseña contra su hash
     */
    static verifyPassword(password, hash) {
        return __awaiter(this, void 0, void 0, function* () {
            const pepperedPassword = password + this.PEPPER;
            return bcrypt_1.default.compare(pepperedPassword, hash);
        });
    }
    /**
     * Genera un token aleatorio seguro
     */
    static generateSecureToken(length = 32) {
        return crypto_1.default.randomBytes(length).toString('hex');
    }
    /**
     * Genera un hash SHA-256
     */
    static generateHash(input) {
        return crypto_1.default.createHash('sha256').update(input).digest('hex');
    }
    /**
     * Genera un hash HMAC
     */
    static generateHMAC(data, secret) {
        return crypto_1.default.createHmac('sha256', secret).update(data).digest('hex');
    }
    /**
     * Verifica si la contraseña es segura
     */
    static isPasswordSecure(password) {
        const requirements = {
            minLength: password.length >= 8,
            hasUppercase: /[A-Z]/.test(password),
            hasLowercase: /[a-z]/.test(password),
            hasNumber: /\d/.test(password),
            hasSpecialChar: /[.@$!%*?&_,;\-]/.test(password)
        };
        const isSecure = Object.values(requirements).every(req => req);
        return {
            isSecure,
            requirements
        };
    }
    /**
     * Genera una contraseña aleatoria segura
     */
    static generateSecurePassword(length = 16) {
        const lowercase = 'abcdefghijklmnopqrstuvwxyz';
        const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numbers = '0123456789';
        const symbols = '@$!%*?&';
        const allChars = lowercase + uppercase + numbers + symbols;
        let password = '';
        // Asegurar que tenga al menos un carácter de cada tipo
        password += lowercase[Math.floor(Math.random() * lowercase.length)];
        password += uppercase[Math.floor(Math.random() * uppercase.length)];
        password += numbers[Math.floor(Math.random() * numbers.length)];
        password += symbols[Math.floor(Math.random() * symbols.length)];
        // Llenar el resto aleatoriamente
        for (let i = 4; i < length; i++) {
            password += allChars[Math.floor(Math.random() * allChars.length)];
        }
        // Mezclar los caracteres
        return password.split('').sort(() => Math.random() - 0.5).join('');
    }
    /**
     * Compara dos strings de forma segura (timing-safe)
     */
    static timingSafeEqual(a, b) {
        if (a.length !== b.length) {
            return false;
        }
        const bufferA = Buffer.from(a, 'utf8');
        const bufferB = Buffer.from(b, 'utf8');
        return crypto_1.default.timingSafeEqual(bufferA, bufferB);
    }
}
exports.CryptoService = CryptoService;
CryptoService.SALT_ROUNDS = 12;
CryptoService.PEPPER = process.env.PASSWORD_PEPPER || 'default-pepper-change-in-production';
