import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Index, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Sellers } from './Sellers';
import { Buyers } from './Buyers';
import { RefreshToken } from './RefreshToken';

@Entity('users')
@Index(['email'], { unique: true })
@Index(['username'], { unique: true })
@Index(['isActive'])
export class Users {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type: 'varchar',
        length: 50,
        nullable: false
    })
    name!: string;

    @Column({
        type: 'varchar',
        length: 30,
        nullable: false,
        unique: true
    })
    username!: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
        default: 'https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png'
    })
    img!: string;

    @Column({
        type: 'int',
        default: 0,
        name: 'token_version'
    })
    tokenVersion!: number;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        unique: true
    })
    email!: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
        select: false // No incluir por defecto en las consultas por seguridad
    })
    password!: string;

    @Column({
        type: 'boolean',
        default: true,
        name: 'is_active'
    })
    isActive!: boolean;

    @Column({
        type: 'timestamp',
        nullable: true,
        name: 'last_login_at'
    })
    lastLoginAt?: Date;

    @Column({
        type: 'int',
        default: 0,
        name: 'failed_login_attempts'
    })
    failedLoginAttempts!: number;

    @Column({
        type: 'timestamp',
        nullable: true,
        name: 'locked_until'
    })
    lockedUntil?: Date;

    @Column({
        type: 'timestamp',
        nullable: true,
        name: 'email_verified_at'
    })
    emailVerifiedAt?: Date;

    @CreateDateColumn({ 
        name: 'created_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    createdAt!: Date;

    @UpdateDateColumn({ 
        name: 'updated_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP'
    })
    updatedAt!: Date;

    // Relaciones
    @OneToMany(() => Sellers, seller => seller.user, { cascade: true })
    sellers!: Sellers[];

    @OneToMany(() => Buyers, buyer => buyer.user, { cascade: true })
    buyers!: Buyers[];

    @OneToMany(() => RefreshToken, token => token.user, { cascade: true })
    refreshTokens!: RefreshToken[];
}