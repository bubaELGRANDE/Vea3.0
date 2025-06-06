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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const user_service_1 = require("./user.service");
const auth_types_1 = require("../auth/auth.types");
const auth_dto_1 = require("../auth/auth.dto");
class UserController {
    constructor() {
        /**
         * Obtener usuario por ID
         */
        this.getUserById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const userId = parseInt(id);
                if (isNaN(userId)) {
                    res.status(400).json({
                        success: false,
                        error: {
                            code: 'VALIDATION_ERROR',
                            message: 'ID de usuario inválido'
                        }
                    });
                    return;
                }
                const user = yield this.userService.getUserById(userId);
                if (!user) {
                    res.status(404).json({
                        success: false,
                        error: {
                            code: 'USER_NOT_FOUND',
                            message: 'Usuario no encontrado'
                        }
                    });
                    return;
                }
                res.status(200).json({
                    success: true,
                    data: user
                });
            }
            catch (error) {
                this.handleError(error, res);
            }
        });
        /**
         * Obtener usuario por email
         */
        this.getUserByEmail = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.params;
                if (!email) {
                    res.status(400).json({
                        success: false,
                        error: {
                            code: 'VALIDATION_ERROR',
                            message: 'Email requerido'
                        }
                    });
                    return;
                }
                const user = yield this.userService.getUserByEmail(email);
                if (!user) {
                    res.status(404).json({
                        success: false,
                        error: {
                            code: 'USER_NOT_FOUND',
                            message: 'Usuario no encontrado'
                        }
                    });
                    return;
                }
                res.status(200).json({
                    success: true,
                    data: user
                });
            }
            catch (error) {
                this.handleError(error, res);
            }
        });
        /**
         * Obtener usuario por username
         */
        this.getUserByUsername = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { username } = req.params;
                if (!username) {
                    res.status(400).json({
                        success: false,
                        error: {
                            code: 'VALIDATION_ERROR',
                            message: 'Username requerido'
                        }
                    });
                    return;
                }
                const user = yield this.userService.getUserByUsername(username);
                if (!user) {
                    res.status(404).json({
                        success: false,
                        error: {
                            code: 'USER_NOT_FOUND',
                            message: 'Usuario no encontrado'
                        }
                    });
                    return;
                }
                res.status(200).json({
                    success: true,
                    data: user
                });
            }
            catch (error) {
                this.handleError(error, res);
            }
        });
        /**
         * Obtener todos los usuarios con paginación
         */
        this.getUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const page = parseInt(req.query.page) || 1;
                const limit = parseInt(req.query.limit) || 10;
                const search = req.query.search;
                if (page < 1 || limit < 1 || limit > 100) {
                    res.status(400).json({
                        success: false,
                        error: {
                            code: 'VALIDATION_ERROR',
                            message: 'Parámetros de paginación inválidos'
                        }
                    });
                    return;
                }
                const result = yield this.userService.getUsers(page, limit, search);
                res.status(200).json({
                    success: true,
                    data: result
                });
            }
            catch (error) {
                this.handleError(error, res);
            }
        });
        /**
         * Actualizar usuario
         */
        this.updateUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const userId = parseInt(id);
                if (isNaN(userId)) {
                    res.status(400).json({
                        success: false,
                        error: {
                            code: 'VALIDATION_ERROR',
                            message: 'ID de usuario inválido'
                        }
                    });
                    return;
                }
                // Verificar permisos: solo el propio usuario o admin puede actualizar
                if (req.user && req.user.id !== userId && !req.user.roles.includes('admin')) {
                    res.status(403).json({
                        success: false,
                        error: {
                            code: 'FORBIDDEN',
                            message: 'Sin permisos para actualizar este usuario'
                        }
                    });
                    return;
                }
                const updateUserDto = (0, class_transformer_1.plainToClass)(auth_dto_1.UpdateUserDto, req.body);
                const errors = yield (0, class_validator_1.validate)(updateUserDto);
                if (errors.length > 0) {
                    res.status(400).json({
                        success: false,
                        error: {
                            code: 'VALIDATION_ERROR',
                            message: 'Datos de entrada inválidos',
                            details: errors.map(error => ({
                                field: error.property,
                                errors: Object.values(error.constraints || {})
                            }))
                        }
                    });
                    return;
                }
                const user = yield this.userService.updateUser(userId, updateUserDto);
                res.status(200).json({
                    success: true,
                    data: user,
                    message: 'Usuario actualizado exitosamente'
                });
            }
            catch (error) {
                this.handleError(error, res);
            }
        });
        /**
         * Desactivar usuario
         */
        this.deactivateUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const userId = parseInt(id);
                if (isNaN(userId)) {
                    res.status(400).json({
                        success: false,
                        error: {
                            code: 'VALIDATION_ERROR',
                            message: 'ID de usuario inválido'
                        }
                    });
                    return;
                }
                // Solo admin puede desactivar usuarios
                if (!req.user || !req.user.roles.includes('admin')) {
                    res.status(403).json({
                        success: false,
                        error: {
                            code: 'FORBIDDEN',
                            message: 'Sin permisos para desactivar usuarios'
                        }
                    });
                    return;
                }
                yield this.userService.deactivateUser(userId);
                res.status(200).json({
                    success: true,
                    message: 'Usuario desactivado exitosamente'
                });
            }
            catch (error) {
                this.handleError(error, res);
            }
        });
        /**
         * Activar usuario
         */
        this.activateUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const userId = parseInt(id);
                if (isNaN(userId)) {
                    res.status(400).json({
                        success: false,
                        error: {
                            code: 'VALIDATION_ERROR',
                            message: 'ID de usuario inválido'
                        }
                    });
                    return;
                }
                // Solo admin puede activar usuarios
                if (!req.user || !req.user.roles.includes('admin')) {
                    res.status(403).json({
                        success: false,
                        error: {
                            code: 'FORBIDDEN',
                            message: 'Sin permisos para activar usuarios'
                        }
                    });
                    return;
                }
                yield this.userService.activateUser(userId);
                res.status(200).json({
                    success: true,
                    message: 'Usuario activado exitosamente'
                });
            }
            catch (error) {
                this.handleError(error, res);
            }
        });
        /**
         * Eliminar usuario
         */
        this.deleteUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const userId = parseInt(id);
                if (isNaN(userId)) {
                    res.status(400).json({
                        success: false,
                        error: {
                            code: 'VALIDATION_ERROR',
                            message: 'ID de usuario inválido'
                        }
                    });
                    return;
                }
                // Solo admin puede eliminar usuarios
                if (!req.user || !req.user.roles.includes('admin')) {
                    res.status(403).json({
                        success: false,
                        error: {
                            code: 'FORBIDDEN',
                            message: 'Sin permisos para eliminar usuarios'
                        }
                    });
                    return;
                }
                yield this.userService.deleteUser(userId);
                res.status(200).json({
                    success: true,
                    message: 'Usuario eliminado exitosamente'
                });
            }
            catch (error) {
                this.handleError(error, res);
            }
        });
        this.userService = new user_service_1.UserService();
    }
    /**
     * Manejo centralizado de errores
     */
    handleError(error, res) {
        console.error('Error en UserController:', error);
        if (error instanceof auth_types_1.AuthError) {
            res.status(error.statusCode).json({
                success: false,
                error: {
                    code: error.code,
                    message: error.message
                }
            });
        }
        else {
            res.status(500).json({
                success: false,
                error: {
                    code: 'INTERNAL_ERROR',
                    message: 'Error interno del servidor'
                }
            });
        }
    }
}
exports.UserController = UserController;
