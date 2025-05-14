import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, Double } from 'typeorm';
import {Users} from './Users';

@Entity()
export class Buyers {
    @PrimaryGeneratedColumn()
    id!: number;

    @OneToOne(() => Users , (user) => user.id)
    @JoinColumn()
    user_id!: Users;

    @Column({
        type: 'varchar',
        length: 10,
        nullable: false
    })
    phone!: number;
}
