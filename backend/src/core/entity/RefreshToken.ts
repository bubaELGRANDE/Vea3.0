<<<<<<< HEAD
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
=======
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
>>>>>>> main
import { Users } from './Users';

@Entity()
export class RefreshToken {
    @PrimaryGeneratedColumn()
<<<<<<< HEAD
    id!: number;

    @OneToOne(() => Users, (user) => user.id)
    @JoinColumn()
    user_id!: Users;

    @Column({ 
        type: 'text',
        nullable: false
    })
    refresh_token!: string;
=======
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
>>>>>>> main

    @Column({
        type: 'timestamp',
        nullable: false,
<<<<<<< HEAD
        default: () => 'CURRENT_TIMESTAMP'
    })
    issued_time!: Date;
=======
        default: () => 'CURRENT_TIMESTAMP',
        name: 'issued_time' // Especificar el nombre exacto de la columna
    })
    issuedTime!: Date;
>>>>>>> main

    @Column({
        type: 'timestamp',
        nullable: false,
<<<<<<< HEAD
        default: () => 'CURRENT_TIMESTAMP'
    })
    expired_time!: Date;
=======
        default: () => 'CURRENT_TIMESTAMP',
        name: 'expired_time' // Especificar el nombre exacto de la columna
    })
    expiredTime!: Date;
>>>>>>> main
}