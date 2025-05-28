import bcrypt from 'bcrypt';
import crypto from 'crypto';

export class CryptoService {
    private static readonly SALT_ROUNDS = 12;
    private static readonly PEPPER = process.env.PASSWORD_PEPPER || 'default-pepper-change-in-production';

    /**
     * Hashea una contraseña con salt y pepper
     */
    static async hashPassword(password: string): Promise<string> {
        const pepperedPassword = password + this.PEPPER;
        return bcrypt.hash(pepperedPassword, this.SALT_ROUNDS);
    }

    /**
     * Verifica una contraseña contra su hash
     */
    static async verifyPassword(password: string, hash: string): Promise<boolean> {
        const pepperedPassword = password + this.PEPPER;
        return bcrypt.compare(pepperedPassword, hash);
    }

    /**
     * Genera un token aleatorio seguro
     */
    static generateSecureToken(length: number = 32): string {
        return crypto.randomBytes(length).toString('hex');
    }

    /**
     * Genera un hash SHA-256
     */
    static generateHash(input: string): string {
        return crypto.createHash('sha256').update(input).digest('hex');
    }

    /**
     * Genera un hash HMAC
     */
    static generateHMAC(data: string, secret: string): string {
        return crypto.createHmac('sha256', secret).update(data).digest('hex');
    }

    /**
     * Verifica si la contraseña es segura
     */
    static isPasswordSecure(password: string): {
        isSecure: boolean;
        requirements: {
            minLength: boolean;
            hasUppercase: boolean;
            hasLowercase: boolean;
            hasNumber: boolean;
            hasSpecialChar: boolean;
        };
    } {
        const requirements = {
            minLength: password.length >= 8,
            hasUppercase: /[A-Z]/.test(password),
            hasLowercase: /[a-z]/.test(password),
            hasNumber: /\d/.test(password),
            hasSpecialChar: /[@$!%*?&]/.test(password)
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
    static generateSecurePassword(length: number = 16): string {
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
    static timingSafeEqual(a: string, b: string): boolean {
        if (a.length !== b.length) {
            return false;
        }
        
        const bufferA = Buffer.from(a, 'utf8');
        const bufferB = Buffer.from(b, 'utf8');
        
        return crypto.timingSafeEqual(bufferA, bufferB);
    }
}
