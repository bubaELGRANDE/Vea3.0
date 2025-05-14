import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, Double } from 'typeorm';
import {Users} from './Users';
import {Municipalities} from './Municipalities';

@Entity()
export class Sellers {
    @PrimaryGeneratedColumn()
    id!: number;

    @OneToOne(() => Users, (user) => user.id)
    @JoinColumn()
    user!: Users;

    @Column({ nullable: false })
    direction!: string;

    @OneToOne(() => Municipalities, (municipality) => municipality.id)
    @JoinColumn()
    municipality!: Municipalities;

    @Column({
        type: 'varchar',
        length: 10,
        nullable: false
    })
    phone!: number;

    @Column({
        type: 'double',
        nullable: false
    })
    score!: Double;
}
