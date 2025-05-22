import { DataSource } from "typeorm";
import dotenv from "dotenv";
import path from 'path';
import { env } from "./env";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "mysql",
    host: env.DB_HOST || 'localhost',
    port: parseInt(env.DB_PORT || '3306'),
    username: env.DB_USERNAME || 'root',
    password: env.DB_PASSWORD || '',
    database: env.DB_DATABASE || 'vea_db',
    synchronize: true,
    logging: false,
    entities: [
        path.join(__dirname, '..', 'entity', '**', '*.ts'),
        path.join(__dirname, '..', 'entity', '**', '*.js')
    ],
    migrations: [],
    subscribers: [],
});