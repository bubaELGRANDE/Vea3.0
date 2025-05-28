import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Index, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Users } from './Users';

@Entity('user_refresh_tokens')
@Index(['userId', 'tokenHash'], { unique: false })
@Index(['expiresAt'])
export class UserRefreshToken {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @ManyToOne(() => Users, user => user.refreshTokens, { 
        onDelete: 'CASCADE',
        eager: false 
    })
    @JoinColumn({ name: 'userId' })
    user!: Users;

    @Column({ name: 'userId' })
    userId!: number;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
        name: 'token_hash'
    })
    tokenHash!: string; // Hash del refresh token para seguridad

    @Column({
        type: 'varchar',
        length: 100,
        nullable: true,
        name: 'device_info'
    })
    deviceInfo?: string; // Información del dispositivo/navegador

    @Column({
        type: 'varchar',
        length: 45,
        nullable: true,
        name: 'ip_address'
    })
    ipAddress?: string;

    @Column({
        type: 'varchar',
        length: 500,
        nullable: true,
        name: 'user_agent'
    })
    userAgent?: string;

    @Column({
        type: 'timestamp',
        nullable: false,
        name: 'expires_at'
    })
    expiresAt!: Date;

    @Column({
        type: 'timestamp',
        nullable: true,
        name: 'last_used_at'
    })
    lastUsedAt?: Date;

    @Column({
        type: 'boolean',
        default: true,
        name: 'is_active'
    })
    isActive!: boolean;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;
}

@Entity('user_password_resets')
@Index(['token'], { unique: true })
@Index(['email'])
@Index(['expiresAt'])
export class UserPasswordReset {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false
    })
    email!: string;    @Column({
        type: 'varchar',
        length: 255,
        nullable: false
    })
    token!: string;

    @Column({
        type: 'timestamp',
        nullable: false,
        name: 'expires_at'
    })
    expiresAt!: Date;

    @Column({
        type: 'boolean',
        default: false,
        name: 'is_used'
    })
    isUsed!: boolean;

    @Column({
        type: 'varchar',
        length: 45,
        nullable: true,
        name: 'ip_address'
    })
    ipAddress?: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;
}

@Entity('user_login_attempts')
@Index(['email'])
@Index(['ipAddress'])
@Index(['createdAt'])
export class UserLoginAttempt {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false
    })
    email!: string;

    @Column({
        type: 'varchar',
        length: 45,
        nullable: false,
        name: 'ip_address'
    })
    ipAddress!: string;

    @Column({
        type: 'varchar',
        length: 500,
        nullable: true,
        name: 'user_agent'
    })
    userAgent?: string;

    @Column({
        type: 'boolean',
        default: false,
        name: 'is_successful'
    })
    isSuccessful!: boolean;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: true,
        name: 'failure_reason'
    })
    failureReason?: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;
}

@Entity('user_sessions')
@Index(['userId'])
@Index(['tokenHash'])
@Index(['expiresAt'])
export class UserSession {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @ManyToOne(() => Users, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user!: Users;

    @Column({ name: 'userId' })
    userId!: number;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
        name: 'token_hash'
    })
    tokenHash!: string;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: true,
        name: 'device_info'
    })
    deviceInfo?: string;

    @Column({
        type: 'varchar',
        length: 45,
        nullable: true,
        name: 'ip_address'
    })
    ipAddress?: string;

    @Column({
        type: 'varchar',
        length: 500,
        nullable: true,
        name: 'user_agent'
    })
    userAgent?: string;

    @Column({
        type: 'timestamp',
        nullable: false,
        name: 'expires_at'
    })
    expiresAt!: Date;

    @Column({
        type: 'timestamp',
        nullable: true,
        name: 'last_activity_at'
    })
    lastActivityAt?: Date;

    @Column({
        type: 'boolean',
        default: true,
        name: 'is_active'
    })
    isActive!: boolean;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;
}
