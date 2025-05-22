import { Request, Response } from 'express';
import { UserService } from './usuarios.service';
import { CreateUserDto, UpdateUserDto } from './usuarios.model';
import { AppDataSource } from '../../core/confi/data-source';
import { Users } from '../../core/entity/Users';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

export class UserController {
    private readonly userService: UserService;

    constructor() {
        const userRepository = AppDataSource.getRepository(Users);
        this.userService = new UserService(userRepository);
    }

    async createUser(req: Request, res: Response): Promise<void> {
        try {
            const createUserDto = plainToClass(CreateUserDto, req.body);
            const errors = await validate(createUserDto);
            if (errors.length > 0) {
                res.status(400).json({ message: 'Validación fallida', errors });
                return;
            }
            const user = await this.userService.createUser(createUserDto);
            res.status(201).json(user);
        } catch (error: any) {
            if (error.message.includes('ya está en uso')) {
                res.status(409).json({ message: error.message });
            } else {
                res.status(500).json({ message: error.message });
            }
        }
    }

    async getUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await this.userService.getUsers();
            res.status(200).json(users);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getUserById(req: Request, res: Response): Promise<void> {
        try {
            const userId = parseInt(req.params.id, 10);
            const user = await this.userService.getUserById(userId);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: 'Usuario no encontrado' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateUser(req: Request, res: Response): Promise<void> {
        try {
            const userId = parseInt(req.params.id, 10);
            // Validar payload
            const updateUserDto = plainToClass(UpdateUserDto, req.body);
            const errors = await validate(updateUserDto);
            if (errors.length > 0) {
                res.status(400).json({ message: 'Validación fallida', errors });
                return;
            }
            const user = await this.userService.updateUser(userId, updateUserDto);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: 'Usuario no encontrado' });
            }
        } catch (error: any) {
            if (error.message.includes('ya está en uso')) {
                res.status(409).json({ message: error.message });
            } else {
                res.status(500).json({ message: error.message });
            }
        }
    }

    async deleteUser(req: Request, res: Response): Promise<void> {
        try {
            const userId = parseInt(req.params.id, 10);
            await this.userService.deleteUser(userId);
            res.status(204).send();
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}
