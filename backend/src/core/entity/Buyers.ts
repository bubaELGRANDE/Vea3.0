import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Users } from './Users';
import { Sales } from './Sales';
import { Chat } from './Chat';

@Entity('buyers') // Especificando el nombre de la tabla para mayor claridad
export class Buyers {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type: 'varchar',
        length: 15, // Un poco más de espacio para números de teléfono
        nullable: true // Es bueno que sea nullable para datos existentes
    })
    phone!: string;

    // --- CAMPO DE DIRECCIÓN AÑADIDO AQUÍ ---
    // Este es el campo que faltaba y que causaba los errores de TypeScript.
    @Column({
        type: 'varchar',
        length: 255,
        nullable: true, // Importante que sea opcional para compradores existentes.
        name: 'direction'
    })
    direction?: string;
    // -----------------------------------------

    // La relación con Users es One-to-One: un perfil de comprador por cada usuario.
    @OneToOne(() => Users, { eager: true }) // eager: true carga el usuario automáticamente.
    @JoinColumn({ name: 'userId' })
    user!: Users;

    // Relaciones inversas (correctas según tu código)
    @OneToMany(() => Sales, sale => sale.buyer)
    sales!: Sales[];

    @OneToMany(() => Chat, chat => chat.buyer)
    chats!: Chat[];
}
