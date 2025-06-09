import { Router } from 'express';
import { AuthController } from './auth.controller';
import { UserController } from '../usuarios/user.controller';
import { authMiddleware } from '../../core/middleware/auth.middleware';

// Controladores
const authController = new AuthController();
const userController = new UserController();

// Router de autenticación
export const authRoutes = Router();

// Rutas públicas de autenticación
authRoutes.post('/login', authController.login);
authRoutes.post('/register', authController.register);
authRoutes.post('/refresh-token', authController.refreshToken);
authRoutes.post('/logout', authController.logout);
authRoutes.post('/forgot-password', authController.forgotPassword);
authRoutes.post('/reset-password', authController.resetPassword);

// Rutas protegidas de autenticación
authRoutes.use(authMiddleware.authenticate); // Aplicar middleware de autenticación a todas las rutas siguientes

authRoutes.get('/profile', authController.getProfile);
authRoutes.post('/change-password', authController.changePassword);
authRoutes.post('/revoke-all-tokens', authController.revokeAllTokens);
authRoutes.get('/sessions', authController.getSessions);
authRoutes.delete('/sessions/:sessionId', authController.revokeSession);

// Router de usuarios
export const userRoutes = Router();

// Rutas públicas de usuarios (limitadas)
userRoutes.get('/username/:username', userController.getUserByUsername);

// Rutas protegidas de usuarios
userRoutes.use(authMiddleware.authenticate); // Aplicar middleware de autenticación

userRoutes.get('/', authMiddleware.authorize(['admin']), userController.getUsers);
userRoutes.get('/:id', userController.getUserById);
userRoutes.get('/email/:email', authMiddleware.authorize(['admin']), userController.getUserByEmail);
userRoutes.put('/:id', userController.updateUser); // El controlador verifica permisos internamente
userRoutes.patch('/:id/deactivate', authMiddleware.authorize(['admin']), userController.deactivateUser);
userRoutes.patch('/:id/activate', authMiddleware.authorize(['admin']), userController.activateUser);
userRoutes.delete('/:id', authMiddleware.authorize(['admin']), userController.deleteUser);

// Router principal que combina auth y users
export const authenticationRoutes = Router();

authenticationRoutes.use('/auth', authRoutes);
authenticationRoutes.use('/users', userRoutes);

// Rutas de health check y estadísticas (solo para admin)
authenticationRoutes.get('/health', authMiddleware.authenticate, authMiddleware.authorize(['admin']), (req, res) => {
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

export default authenticationRoutes;
