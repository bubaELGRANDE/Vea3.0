import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Users } from './Users';

@Entity()
export class RefreshToken {
    @PrimaryGeneratedColumn()
    id!: number;

    @OneToOne(() => Users, (user) => user.id)
    @JoinColumn()
    user_id!: Users;

    @Column({ 
        type: 'text',
        nullable: false
    })
    refresh_token!: string;

    @Column({
        type: 'timestamp',
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP'
    })
    issued_time!: Date;

    @Column({
        type: 'timestamp',
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP'
    })
    expired_time!: Date;
}