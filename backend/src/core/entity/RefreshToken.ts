import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Users } from './Users';

@Entity()
export class RefreshToken {
    @PrimaryGeneratedColumn()
    id!: number;    
      @ManyToOne(() => Users, user => user.refreshTokens, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' }) // Cambiado de nuevo a userId
    user!: Users;

    @Column({
        type: 'text',
        nullable: false,
        name: 'refresh_token' // Especificar el nombre exacto de la columna
    })
    refreshToken!: string;

    @Column({
        type: 'timestamp',
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
        name: 'issued_time' // Especificar el nombre exacto de la columna
    })
    issuedTime!: Date;

    @Column({
        type: 'timestamp',
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
        name: 'expired_time' // Especificar el nombre exacto de la columna
    })
    expiredTime!: Date;
}