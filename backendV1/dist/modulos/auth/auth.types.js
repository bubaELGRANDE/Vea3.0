"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthError = exports.AuthErrorCodes = void 0;
var AuthErrorCodes;
(function (AuthErrorCodes) {
    AuthErrorCodes["INVALID_CREDENTIALS"] = "INVALID_CREDENTIALS";
    AuthErrorCodes["ACCOUNT_INACTIVE"] = "ACCOUNT_INACTIVE";
    AuthErrorCodes["ACCOUNT_LOCKED"] = "ACCOUNT_LOCKED";
    AuthErrorCodes["TOKEN_EXPIRED"] = "TOKEN_EXPIRED";
    AuthErrorCodes["TOKEN_INVALID"] = "TOKEN_INVALID";
    AuthErrorCodes["TOKEN_REVOKED"] = "TOKEN_REVOKED";
    AuthErrorCodes["USER_NOT_FOUND"] = "USER_NOT_FOUND";
    AuthErrorCodes["INVALID_PASSWORD"] = "INVALID_PASSWORD";
    AuthErrorCodes["EMAIL_ALREADY_EXISTS"] = "EMAIL_ALREADY_EXISTS";
    AuthErrorCodes["USERNAME_ALREADY_EXISTS"] = "USERNAME_ALREADY_EXISTS";
    AuthErrorCodes["UNAUTHORIZED"] = "UNAUTHORIZED";
    AuthErrorCodes["FORBIDDEN"] = "FORBIDDEN";
})(AuthErrorCodes || (exports.AuthErrorCodes = AuthErrorCodes = {}));
class AuthError extends Error {
    constructor(code, message, statusCode = 401) {
        super(message);
        this.code = code;
        this.statusCode = statusCode;
        this.name = 'AuthError';
    }
}
exports.AuthError = AuthError;
