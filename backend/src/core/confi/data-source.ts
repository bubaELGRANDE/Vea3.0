import { DataSource } from "typeorm";
import dotenv from "dotenv";
import path from 'path';

dotenv.config();

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'vea_db',
    synchronize: true,
    logging: false,
    entities: [
        path.join(__dirname, '..', 'entity', '**', '*.ts'),
        path.join(__dirname, '..', 'entity', '**', '*.js')
    ],
    migrations: [],
    subscribers: [],
});