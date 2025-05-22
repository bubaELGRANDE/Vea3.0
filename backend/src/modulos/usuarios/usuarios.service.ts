import { Repository } from 'typeorm';
import { Users } from '../../core/entity/Users';
import { CreateUserDto, UpdateUserDto } from './usuarios.model';
import bcrypt from 'bcrypt';

export class UserService {
    constructor(private readonly userRepository: Repository<Users>) {}

    async createUser(createUserDto: CreateUserDto): Promise<Users> {
        const { name, username, img, email, password, isActive } = createUserDto;
        const emailExists = await this.userRepository.findOneBy({ email });
        if (emailExists) {
            throw new Error('Email ya está en uso');
        }
        const usernameExists = await this.userRepository.findOneBy({ username });
        if (usernameExists) {
            throw new Error('Username ya está en uso');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = this.userRepository.create({
            name,
            username,
            img: img || 'https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png',
            email,
            password: hashedPassword,
            isActive: isActive !== undefined ? isActive : true, 
            token_version: 0 
        });
        return this.userRepository.save(user);
    }

    async getUsers(): Promise<Users[]> {
        return this.userRepository.find();
    }

    async getUserById(id: number): Promise<Users | null> {
        return this.userRepository.findOneBy({ id });
    }

    async getUserByEmail(email: string): Promise<Users | null> {
        return this.userRepository.findOneBy({ email });
    }

    async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<Users | null> {
        let userToUpdate = await this.userRepository.findOneBy({ id });
        if (!userToUpdate) {
            return null;
        }
        if (updateUserDto.password) {
            updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
        }
        if (updateUserDto.email) {
            const emailExists = await this.userRepository.findOneBy({ email: updateUserDto.email });
            if (emailExists && emailExists.id !== id) {
                throw new Error('Email ya está en uso');
            }
        }
        Object.assign(userToUpdate, updateUserDto);
        return this.userRepository.save(userToUpdate);
    }

    async deleteUser(id: number): Promise<void> {
        await this.userRepository.delete(id);
    }
}
