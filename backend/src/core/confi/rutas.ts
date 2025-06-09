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
import { authMiddleware } from '../middleware/auth.middleware';
import { AppDataSource } from './data-source';

// Importar el nuevo sistema de autenticación
import { authenticationRoutes } from '../../modulos/auth';
// Importar las rutas de archivos
import { uploadRoutes } from '../../modulos/files/files.routes';
// Importar las rutas de Socket.IO
import { socketRoutes } from '../sockets/socket.routes';

export const rutas = express.Router();

const userController = new UserController();
const productController = new ProductController();
const authController = new AuthController(); // Crear instancia de AuthController
const sellersController = new SellersController();
const buyersController = new BuyersController();
const catalogosController = new CatalogosController();
const salesController = new SalesController();
const reviewsController = new ReviewsController();
const chatController = new ChatController();
const departmentsController = new DepartmentsController();

rutas.get("/", (req: Request, res: Response) => {
    res.send("¡El proyecto está funcionando!");
});

// NUEVO SISTEMA DE AUTENTICACIÓN
// Utilizar las rutas del nuevo módulo de autenticación
rutas.use("/v2", authenticationRoutes);

// RUTAS DE ARCHIVOS
// Utilizar las rutas del módulo de archivos
rutas.use("/", uploadRoutes);

// RUTAS DE SOCKET.IO
// API para gestión de Socket.IO
rutas.use("/socket", socketRoutes);



// Rutas de Productos
rutas.post("/products", (req: Request, res: Response) => productController.createProduct(req, res));
rutas.get("/products", (req: Request, res: Response) => productController.getProducts(res));
rutas.get("/products/simplyFormat", (req: Request, res: Response) => productController.getProductsAllInfo(req, res));
rutas.get("/products/:id", (req: Request, res: Response) => productController.getProductById(req, res));
rutas.put("/products/:id", (req: Request, res: Response) => productController.updateProduct(req, res));
rutas.delete("/products/:id", (req: Request, res: Response) => productController.deleteProduct(req, res));
rutas.get("/products/simplyFormat", (req: Request, res: Response) => productController.getProductsAllInfo(req, res));
rutas.get("/products/allinfo", (req: Request, res: Response) => productController.getProductsAllInfo(req, res));

// Rutas de Vendedores
rutas.post("/sellers", (req: Request, res: Response) => sellersController.createSeller(req, res));
rutas.get("/sellers", (req: Request, res: Response) => sellersController.getAllSellers(res));
rutas.get("/sellers/:id", (req: Request, res: Response) => sellersController.getSellerById(req, res));
rutas.put("/sellers/:id", (req: Request, res: Response) => sellersController.updateSeller(req, res));
rutas.delete("/sellers/:id", (req: Request, res: Response) => sellersController.deleteSeller(req, res));

// Rutas de Compradores
rutas.post("/buyers", (req: Request, res: Response) => buyersController.createBuyer(req, res));
rutas.get("/buyers", (req: Request, res: Response) => buyersController.getAllBuyers(res));
rutas.get("/buyers/:id", (req: Request, res: Response) => buyersController.getBuyerById(req, res));
rutas.put("/buyers/:id", (req: Request, res: Response) => buyersController.updateBuyer(req, res));
rutas.delete("/buyers/:id", (req: Request, res: Response) => buyersController.deleteBuyer(req, res));
rutas.get("/buyers/user/:userId", (req: Request, res: Response) => buyersController.getBuyersByUserId(req, res));

// Rutas de Catálogos
// Categories
rutas.get("/catalogos/categories", (req: Request, res: Response) => catalogosController.getCategories(res));
rutas.get("/catalogos/categories/:id", (req: Request, res: Response) => catalogosController.getCategoryById(req, res));

// SELECT * FROM LIKE %SFSDFSDFDS% productos

// Publishing Status
rutas.get("/catalogos/publishingstatus", (req: Request, res: Response) => catalogosController.getPublishingStatus(res));
rutas.get("/catalogos/publishingstatus/:id", (req: Request, res: Response) => catalogosController.getPublishingStatusById(req, res));

// Sale Status
rutas.get("/catalogos/salestatus", (req: Request, res: Response) => catalogosController.getSaleStatus(res));
rutas.get("/catalogos/salestatus/:id", (req: Request, res: Response) => catalogosController.getSaleStatusById(req, res));

// Article Status
rutas.get("/catalogos/articlestatus", (req: Request, res: Response) => catalogosController.getArticleStatus(res));
rutas.get("/catalogos/articlestatus/:id", (req: Request, res: Response) => catalogosController.getArticleStatusById(req, res));

// Rutas de Ventas
rutas.post("/sales", (req: Request, res: Response) => salesController.createSale(req, res));
rutas.get("/sales", (req: Request, res: Response) => salesController.getSales(res));
rutas.get("/sales/:id", (req: Request, res: Response) => salesController.getSaleById(req, res));
rutas.put("/sales/:id", (req: Request, res: Response) => salesController.updateSale(req, res));
rutas.delete("/sales/:id", (req: Request, res: Response) => salesController.deleteSale(req, res));

// Rutas de Reviews
rutas.post("/reviews", (req: Request, res: Response) => reviewsController.createReview(req, res));
rutas.get("/reviews", (req: Request, res: Response) => reviewsController.getReviews(res));
rutas.get("/reviews/:id", (req: Request, res: Response) => reviewsController.getReviewById(req, res));
rutas.put("/reviews/:id", (req: Request, res: Response) => reviewsController.updateReview(req, res));
rutas.delete("/reviews/:id", (req: Request, res: Response) => reviewsController.deleteReview(req, res));
rutas.get("/reviews/product/:publishingId/average-rating", (req: Request, res: Response) => reviewsController.getAverageRatingByPublishing(req, res));

// Rutas de Chat
rutas.post("/chat", (req: Request, res: Response) => chatController.createChat(req, res));
rutas.get("/chat", (req: Request, res: Response) => chatController.getChats(res));
rutas.get("/chat/:id", (req: Request, res: Response) => chatController.getChatById(req, res));
rutas.put("/chat/:id", (req: Request, res: Response) => chatController.updateChat(req, res));
rutas.delete("/chat/:id", (req: Request, res: Response) => chatController.deleteChat(req, res));
rutas.get("/chat/buyer/:buyerId", (req: Request, res: Response) => chatController.getChatsByBuyer(req, res));
rutas.get("/chat/seller/:sellerId", (req: Request, res: Response) => chatController.getChatsBySeller(req, res));
rutas.get("/chat/product/:publishingId", (req: Request, res: Response) => chatController.getChatsByPublishing(req, res));
rutas.put("/chat/:id/enable", (req: Request, res: Response) => chatController.enableChat(req, res));
rutas.put("/chat/:id/disable", (req: Request, res: Response) => chatController.disableChat(req, res));

// Rutas de Departments
rutas.get("/departments", (req: Request, res: Response) => departmentsController.getDepartments(res));
rutas.get("/departments/:id", (req: Request, res: Response) => departmentsController.getDepartmentById(req, res));

// Rutas de Municipalities
rutas.get("/municipalities", (req: Request, res: Response) => departmentsController.getMunicipalities(res));
rutas.get("/municipalities/:id", (req: Request, res: Response) => departmentsController.getMunicipalityById(req, res));
rutas.get("/municipalities/department/:departmentId", (req: Request, res: Response) => departmentsController.getMunicipalitiesByDepartment(req, res));