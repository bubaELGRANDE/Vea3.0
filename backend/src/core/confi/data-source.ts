import { DataSource } from "typeorm";
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

// Importar nuevas entidades del módulo de autenticación
import { 
    UserRefreshToken, 
    UserPasswordReset, 
    UserLoginAttempt, 
    UserSession 
} from "../entity/Auth";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: env.DB_HOST || 'localhost',
    port: parseInt(env.DB_PORT || '3306'),
    username: env.DB_USERNAME || 'root',
    password: env.DB_PASSWORD || '',
    database: env.DB_DATABASE || 'vea_db',
    synchronize: true,
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
    ],
    migrations: [],
    subscribers: [],
});