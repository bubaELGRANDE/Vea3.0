import { DataSource } from "typeorm";
<<<<<<< HEAD
import dotenv from "dotenv";
import path from 'path';
import { env } from "./env";

dotenv.config();
=======
import { env } from "./env";

// Importar todas las entidades explícitamente
import { Users } from "../entity/Users";
import { RefreshToken } from "../entity/RefreshToken";
import { Sellers } from "../entity/Sellers";
import { Buyers } from "../entity/Buyers";
import { Categories } from "../entity/Categories";
import { ArticleStatus } from "../entity/ArticleStatus";
import { PublishingStatus } from "../entity/PublishingStatus";
import { SaleStatus } from "../entity/SaleStatus";
import { Departments } from "../entity/Departments";
import { Municipalities } from "../entity/Municipalities";
import { Publishing } from "../entity/Publishing";
import { PublishingCategories } from "../entity/PublishingCategories";
import { PublishingDesc } from "../entity/PublishingDesc";
import { PublishingImg } from "../entity/PublishingImg";
import { Sales } from "../entity/Sales";
import { SaleDet } from "../entity/SaleDet";
import { Reviews } from "../entity/Reviews";
import { Chat } from "../entity/Chat";
import { Payload } from "../entity/Payload";

import { 
    UserRefreshToken, 
    UserPasswordReset, 
    UserLoginAttempt, 
    UserSession 
} from "../entity/Auth";
>>>>>>> main

export const AppDataSource = new DataSource({
    type: "mysql",
    host: env.DB_HOST || 'localhost',
    port: parseInt(env.DB_PORT || '3306'),
    username: env.DB_USERNAME || 'root',
    password: env.DB_PASSWORD || '',
    database: env.DB_DATABASE || 'vea_db',
    synchronize: true,
<<<<<<< HEAD
    logging: false,
    entities: [
        path.join(__dirname, '..', 'entity', '**', '*.ts'),
        path.join(__dirname, '..', 'entity', '**', '*.js')
=======
    logging: ['query', 'error'],    entities: [
        Users,
        RefreshToken,
        Sellers,
        Buyers,
        Categories,
        ArticleStatus,
        PublishingStatus,
        SaleStatus,
        Departments,
        Municipalities,
        Publishing,
        PublishingCategories,
        PublishingDesc,
        PublishingImg,
        Sales,
        SaleDet,
        Reviews,
        Chat,
        Payload,
        // Nuevas entidades del módulo de autenticación
        UserRefreshToken,
        UserPasswordReset,
        UserLoginAttempt,
        UserSession
>>>>>>> main
    ],
    migrations: [],
    subscribers: [],
});