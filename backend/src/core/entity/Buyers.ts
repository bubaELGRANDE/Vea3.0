<<<<<<< HEAD
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, Double } from 'typeorm';
import {Users} from './Users';
=======
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Users } from './Users';
import { Sales } from './Sales';
import { Chat } from './Chat';
>>>>>>> main

@Entity()
export class Buyers {
    @PrimaryGeneratedColumn()
<<<<<<< HEAD
    id!: number;

    @OneToOne(() => Users , (user) => user.id)
    @JoinColumn()
    user_id!: Users;

    @Column({
=======
    id!: number;    @ManyToOne(() => Users, user => user.buyers, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user!: Users;@Column({
>>>>>>> main
        type: 'varchar',
        length: 10,
        nullable: false
    })
<<<<<<< HEAD
    phone!: number;
=======
    phone!: string;

    // Relaciones
    @OneToMany(() => Sales, sale => sale.buyer)
    sales!: Sales[];

    @OneToMany(() => Chat, chat => chat.buyer)
    chats!: Chat[];
>>>>>>> main
}
