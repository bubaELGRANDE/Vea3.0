<<<<<<< HEAD
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, Double } from 'typeorm';
import {Users} from './Users';
import {Municipalities} from './Municipalities';
=======
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Users } from './Users';
import { Municipalities } from './Municipalities';
import { Publishing } from './Publishing';
import { Chat } from './Chat';
>>>>>>> main

@Entity()
export class Sellers {
    @PrimaryGeneratedColumn()
<<<<<<< HEAD
    id!: number;

    @OneToOne(() => Users, (user) => user.id)
    @JoinColumn()
    user!: Users;

    @Column({ nullable: false })
    direction!: string;

    @OneToOne(() => Municipalities, (municipality) => municipality.id)
    @JoinColumn()
=======
    id!: number;    @ManyToOne(() => Users, user => user.sellers, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user!: Users;

    @Column({ 
        type: 'varchar',
        length: 255,
        nullable: false 
    })
    direction!: string;

    @ManyToOne(() => Municipalities, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'municipalityId' })
>>>>>>> main
    municipality!: Municipalities;

    @Column({
        type: 'varchar',
        length: 10,
        nullable: false
    })
<<<<<<< HEAD
    phone!: number;

    @Column({
        type: 'double',
        nullable: false
    })
    score!: Double;
=======
    phone!: string;    @Column({
        type: 'decimal',
        precision: 3,
        scale: 2,
        nullable: false,
        default: 0.00
    })
    score!: number;

    // Relaciones
    @OneToMany(() => Publishing, publishing => publishing.seller)
    publications!: Publishing[];

    @OneToMany(() => Chat, chat => chat.seller)
    chats!: Chat[];
>>>>>>> main
}
