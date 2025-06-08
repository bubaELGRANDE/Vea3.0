import express, { Request, Response } from "express";
import { UserController } from "../../modulos/usuarios/user.controller";
import { ProductController } from "../../modulos/productos/productos.controller";
import { AuthController } from "../../modulos/auth/auth.controller";
import { SellersController } from "../../modulos/sellers/sellers.controller";
import { BuyersController } from "../../modulos/buyers/buyers.controller";
import { CatalogosController } from '../../modulos/catalogos/catalogos.controller';
import { SalesController } from '../../modulos/sales/sales.controller';
import { ReviewsController } from '../../modulos/reviews/reviews.controller';
import { ChatController } from '../../modulos/chat/chat.controller';
import { DepartmentsController } from '../../modulos/departments/departments.controller';
// --- 1. Importar el nuevo controlador ---
import { PublishingController } from "../../modulos/publishing/publishing.controller"; 
import { authMiddleware } from '../middleware/auth.middleware';
import { AppDataSource } from './data-source';
import { MetricsController } from '../../modulos/metrics/metrics.controller';
import { PayloadController } from '../../modulos/payload/payload.controller';
// Importar el nuevo sistema de autenticación
import { authenticationRoutes } from '../../modulos/auth';
import { SalesDetailController } from '../../modulos/salesDetail/sales-detail.controller';

export const rutas = express.Router();

// --- 2. Crear una instancia del nuevo controlador ---
const userController = new UserController();
const productController = new ProductController();
const authController = new AuthController();
const sellersController = new SellersController();
const buyersController = new BuyersController();
const catalogosController = new CatalogosController();
const salesController = new SalesController();
const reviewsController = new ReviewsController();
const chatController = new ChatController();
const departmentsController = new DepartmentsController();
const publishingController = new PublishingController();
const payloadController = new PayloadController();
const metricsController = new MetricsController();
const salesDetailController = new SalesDetailController();

rutas.get("/", (req: Request, res: Response) => {
    res.send("¡El proyecto está funcionando!");
});

// NUEVO SISTEMA DE AUTENTICACIÓN
rutas.use("/v2", authenticationRoutes);

// SISTEMA DE AUTENTICACIÓN LEGACY
rutas.post("/auth/register", (req: Request, res: Response) => authController.register(req, res));
rutas.post("/auth/login", (req: Request, res: Response) => authController.login(req, res));

// Rutas de Productos (products)
rutas.post("/products", (req: Request, res: Response) => productController.createProduct(req, res));
rutas.get("/products", (req: Request, res: Response) => productController.getProducts(req, res));

// Rutas de Ventas (sales)
rutas.post("/sales", (req: Request, res: Response) => salesController.createSale(req, res));
rutas.get("/sales", (req: Request, res: Response) => salesController.getSales(req, res));

// --- Nueva ruta para el detalle de una venta ---
rutas.get("/sales/:id", (req: Request, res: Response) => salesDetailController.getSaleById(req, res));

// Rutas de Categories (catalogos)
rutas.get("/categories", (req: Request, res: Response) => catalogosController.getCategories(req, res));
rutas.get("/categories/:id", (req: Request, res: Response) => catalogosController.getCategoryById(req, res));

// Rutas para PublishingStatus (catalogos)
rutas.get("/publishing-status", (req: Request, res: Response) => catalogosController.getPublishingStatus(req, res));
rutas.get("/publishing-status/:id", (req: Request, res: Response) => catalogosController.getPublishingStatusById(req, res));

// Rutas para SaleStatus (catalogos)
rutas.get("/sale-status", (req: Request, res: Response) => catalogosController.getSaleStatus(req, res));
rutas.get("/sale-status/:id", (req: Request, res: Response) => catalogosController.getSaleStatusById(req, res));

// Rutas para ArticleStatus (catalogos)
rutas.get("/article-status", (req: Request, res: Response) => catalogosController.getArticleStatus(req, res));
rutas.get("/article-status/:id", (req: Request, res: Response) => catalogosController.getArticleStatusById(req, res));

// --- Rutas de Publicaciones ---
rutas.post("/publishing", (req: Request, res: Response) => publishingController.createPublishing(req, res));
rutas.get("/publishing", (req: Request, res: Response) => publishingController.getAllPublishing(req, res));
rutas.get("/publishing/:id", (req: Request, res: Response) => publishingController.getPublishingById(req, res));
rutas.get("/publishing/seller/:sellerId", (req: Request, res: Response) => publishingController.getPublishingBySeller(req, res));
rutas.get("/publishing/status/:statusId", (req: Request, res: Response) => publishingController.getPublishingByStatus(req, res));

// Rutas de Reviews
rutas.post("/reviews", (req: Request, res: Response) => reviewsController.createReview(req, res));
rutas.get("/reviews", (req: Request, res: Response) => reviewsController.getReviews(req, res));

// Puedes seguir agregando más rutas aquí para chat, departments, etc.
rutas.get("/payload", (req: Request, res: Response) => payloadController.getPayloads(req, res));
rutas.get("/payload/:id", (req: Request, res: Response) => payloadController.getPayloadById(req, res));

rutas.get("/metrics", (req: Request, res: Response) => metricsController.getMetrics(req, res));