"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticationRoutes = exports.userRoutes = exports.authRoutes = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const user_controller_1 = require("../usuarios/user.controller");
const auth_middleware_1 = require("../../core/middleware/auth.middleware");
// Controladores
const authController = new auth_controller_1.AuthController();
const userController = new user_controller_1.UserController();
// Router de autenticación
exports.authRoutes = (0, express_1.Router)();
// Rutas públicas de autenticación
exports.authRoutes.post('/login', authController.login);
exports.authRoutes.post('/register', authController.register);
exports.authRoutes.post('/refresh-token', authController.refreshToken);
exports.authRoutes.post('/logout', authController.logout);
exports.authRoutes.post('/forgot-password', authController.forgotPassword);
exports.authRoutes.post('/reset-password', authController.resetPassword);
// Rutas protegidas de autenticación
exports.authRoutes.use(auth_middleware_1.authMiddleware.authenticate); // Aplicar middleware de autenticación a todas las rutas siguientes
exports.authRoutes.get('/profile', authController.getProfile);
exports.authRoutes.post('/change-password', authController.changePassword);
exports.authRoutes.post('/revoke-all-tokens', authController.revokeAllTokens);
exports.authRoutes.get('/sessions', authController.getSessions);
exports.authRoutes.delete('/sessions/:sessionId', authController.revokeSession);
// Router de usuarios
exports.userRoutes = (0, express_1.Router)();
// Rutas públicas de usuarios (limitadas)
exports.userRoutes.get('/username/:username', userController.getUserByUsername);
// Rutas protegidas de usuarios
exports.userRoutes.use(auth_middleware_1.authMiddleware.authenticate); // Aplicar middleware de autenticación
exports.userRoutes.get('/', auth_middleware_1.authMiddleware.authorize(['admin']), userController.getUsers);
exports.userRoutes.get('/:id', userController.getUserById);
exports.userRoutes.get('/email/:email', auth_middleware_1.authMiddleware.authorize(['admin']), userController.getUserByEmail);
exports.userRoutes.put('/:id', userController.updateUser); // El controlador verifica permisos internamente
exports.userRoutes.patch('/:id/deactivate', auth_middleware_1.authMiddleware.authorize(['admin']), userController.deactivateUser);
exports.userRoutes.patch('/:id/activate', auth_middleware_1.authMiddleware.authorize(['admin']), userController.activateUser);
exports.userRoutes.delete('/:id', auth_middleware_1.authMiddleware.authorize(['admin']), userController.deleteUser);
// Router principal que combina auth y users
exports.authenticationRoutes = (0, express_1.Router)();
exports.authenticationRoutes.use('/auth', exports.authRoutes);
exports.authenticationRoutes.use('/users', exports.userRoutes);
// Rutas de health check y estadísticas (solo para admin)
exports.authenticationRoutes.get('/health', auth_middleware_1.authMiddleware.authenticate, auth_middleware_1.authMiddleware.authorize(['admin']), (req, res) => {
    res.json({
        success: true,
        data: {
            service: 'Authentication Service',
            status: 'healthy',
            timestamp: new Date().toISOString(),
            version: '2.0.0'
        }
    });
});
exports.default = exports.authenticationRoutes;
