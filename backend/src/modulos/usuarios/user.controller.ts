import { Request, Response } from 'express';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { UserService } from './user.service';
import { AuthError } from '../auth/auth.types';
import { UpdateUserDto } from '../auth/auth.dto';

interface AuthenticatedRequest extends Request {
    user?: {
        id: number;
        email: string;
        username: string;
        roles: string[];
    };
}

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    /**
     * Obtener usuario por ID
     */
    getUserById = async (req: Request, res: Response): Promise<void> => {
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

            const user = await this.userService.getUserById(userId);

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
        } catch (error) {
            this.handleError(error, res);
        }
    };

    /**
     * Obtener usuario por email
     */
    getUserByEmail = async (req: Request, res: Response): Promise<void> => {
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

            const user = await this.userService.getUserByEmail(email);

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
        } catch (error) {
            this.handleError(error, res);
        }
    };

    /**
     * Obtener usuario por username
     */
    getUserByUsername = async (req: Request, res: Response): Promise<void> => {
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

            const user = await this.userService.getUserByUsername(username);

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
        } catch (error) {
            this.handleError(error, res);
        }
    };

    /**
     * Obtener todos los usuarios con paginación
     */
    getUsers = async (req: Request, res: Response): Promise<void> => {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const search = req.query.search as string;

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

            const result = await this.userService.getUsers(page, limit, search);

            res.status(200).json({
                success: true,
                data: result
            });
        } catch (error) {
            this.handleError(error, res);
        }
    };

    /**
     * Actualizar usuario
     */
    updateUser = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
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

            const updateUserDto = plainToClass(UpdateUserDto, req.body);
            const errors = await validate(updateUserDto);

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

            const user = await this.userService.updateUser(userId, updateUserDto);

            res.status(200).json({
                success: true,
                data: user,
                message: 'Usuario actualizado exitosamente'
            });
        } catch (error) {
            this.handleError(error, res);
        }
    };

    /**
     * Desactivar usuario
     */
    deactivateUser = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
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

            await this.userService.deactivateUser(userId);

            res.status(200).json({
                success: true,
                message: 'Usuario desactivado exitosamente'
            });
        } catch (error) {
            this.handleError(error, res);
        }
    };

    /**
     * Activar usuario
     */
    activateUser = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
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

            await this.userService.activateUser(userId);

            res.status(200).json({
                success: true,
                message: 'Usuario activado exitosamente'
            });
        } catch (error) {
            this.handleError(error, res);
        }
    };

    /**
     * Eliminar usuario
     */
    deleteUser = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
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

            await this.userService.deleteUser(userId);

            res.status(200).json({
                success: true,
                message: 'Usuario eliminado exitosamente'
            });
        } catch (error) {
            this.handleError(error, res);
        }
    };

    /**
     * Manejo centralizado de errores
     */
    private handleError(error: any, res: Response): void {
        console.error('Error en UserController:', error);

        if (error instanceof AuthError) {
            res.status(error.statusCode).json({
                success: false,
                error: {
                    code: error.code,
                    message: error.message
                }
            });
        } else {
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
