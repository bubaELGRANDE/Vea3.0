import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAuthenticationTables1685000000000 implements MigrationInterface {
    name = 'CreateAuthenticationTables1685000000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Crear tabla user_refresh_tokens
        await queryRunner.query(`
            CREATE TABLE user_refresh_tokens (
                id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
                userId INT NOT NULL,
                token_hash VARCHAR(255) NOT NULL,
                device_info VARCHAR(100),
                ip_address VARCHAR(45),
                user_agent VARCHAR(500),
                expires_at TIMESTAMP NOT NULL,
                last_used_at TIMESTAMP NULL,
                is_active BOOLEAN DEFAULT TRUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);

        // Crear tabla user_password_resets
        await queryRunner.query(`
            CREATE TABLE user_password_resets (
                id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
                email VARCHAR(100) NOT NULL,
                token VARCHAR(255) NOT NULL,
                expires_at TIMESTAMP NOT NULL,
                used_at TIMESTAMP NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Crear tabla user_login_attempts
        await queryRunner.query(`
            CREATE TABLE user_login_attempts (
                id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
                email VARCHAR(100) NOT NULL,
                ip_address VARCHAR(45) NOT NULL,
                user_agent VARCHAR(500),
                is_successful BOOLEAN DEFAULT FALSE,
                failure_reason VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Crear tabla user_sessions
        await queryRunner.query(`
            CREATE TABLE user_sessions (
                id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
                userId INT NOT NULL,
                token_hash VARCHAR(255) NOT NULL,
                device_info VARCHAR(100),
                ip_address VARCHAR(45),
                user_agent VARCHAR(500),
                expires_at TIMESTAMP NOT NULL,
                last_activity_at TIMESTAMP NULL,
                is_active BOOLEAN DEFAULT TRUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);

        // Crear foreign keys
        await queryRunner.query(`
            ALTER TABLE user_refresh_tokens 
            ADD CONSTRAINT FK_user_refresh_tokens_userId 
            FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
        `);

        await queryRunner.query(`
            ALTER TABLE user_sessions 
            ADD CONSTRAINT FK_user_sessions_userId 
            FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
        `);

        // Crear índices para user_refresh_tokens
        await queryRunner.query(`
            CREATE INDEX IDX_user_refresh_tokens_userId_token_hash 
            ON user_refresh_tokens (userId, token_hash)
        `);
        await queryRunner.query(`
            CREATE INDEX IDX_user_refresh_tokens_expires_at 
            ON user_refresh_tokens (expires_at)
        `);

        // Crear índices para user_password_resets
        await queryRunner.query(`
            CREATE UNIQUE INDEX IDX_user_password_resets_token 
            ON user_password_resets (token)
        `);
        await queryRunner.query(`
            CREATE INDEX IDX_user_password_resets_email 
            ON user_password_resets (email)
        `);
        await queryRunner.query(`
            CREATE INDEX IDX_user_password_resets_expires_at 
            ON user_password_resets (expires_at)
        `);

        // Crear índices para user_login_attempts
        await queryRunner.query(`
            CREATE INDEX IDX_user_login_attempts_email 
            ON user_login_attempts (email)
        `);
        await queryRunner.query(`
            CREATE INDEX IDX_user_login_attempts_ip_address 
            ON user_login_attempts (ip_address)
        `);
        await queryRunner.query(`
            CREATE INDEX IDX_user_login_attempts_created_at 
            ON user_login_attempts (created_at)
        `);

        // Crear índices para user_sessions
        await queryRunner.query(`
            CREATE INDEX IDX_user_sessions_userId 
            ON user_sessions (userId)
        `);
        await queryRunner.query(`
            CREATE INDEX IDX_user_sessions_token_hash 
            ON user_sessions (token_hash)
        `);
        await queryRunner.query(`
            CREATE INDEX IDX_user_sessions_expires_at 
            ON user_sessions (expires_at)
        `);

        // Actualizar tabla users con nuevos campos
        await queryRunner.query(`
            ALTER TABLE users 
            ADD COLUMN last_login_at TIMESTAMP NULL,
            ADD COLUMN failed_login_attempts INT DEFAULT 0,
            ADD COLUMN locked_until TIMESTAMP NULL,
            ADD COLUMN email_verified_at TIMESTAMP NULL
        `);

        // Crear índices adicionales en users
        await queryRunner.query(`
            CREATE UNIQUE INDEX IDX_users_email 
            ON users (email)
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX IDX_users_username 
            ON users (username)
        `);
        await queryRunner.query(`
            CREATE INDEX IDX_users_is_active 
            ON users (is_active)
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Eliminar foreign keys
        await queryRunner.query(`ALTER TABLE user_refresh_tokens DROP FOREIGN KEY FK_user_refresh_tokens_userId`);
        await queryRunner.query(`ALTER TABLE user_sessions DROP FOREIGN KEY FK_user_sessions_userId`);

        // Eliminar índices de users
        await queryRunner.query(`DROP INDEX IDX_users_email ON users`);
        await queryRunner.query(`DROP INDEX IDX_users_username ON users`);
        await queryRunner.query(`DROP INDEX IDX_users_is_active ON users`);

        // Eliminar columnas agregadas a users
        await queryRunner.query(`
            ALTER TABLE users 
            DROP COLUMN last_login_at,
            DROP COLUMN failed_login_attempts,
            DROP COLUMN locked_until,
            DROP COLUMN email_verified_at
        `);

        // Eliminar tablas
        await queryRunner.query(`DROP TABLE user_sessions`);
        await queryRunner.query(`DROP TABLE user_login_attempts`);
        await queryRunner.query(`DROP TABLE user_password_resets`);
        await queryRunner.query(`DROP TABLE user_refresh_tokens`);
    }
}
