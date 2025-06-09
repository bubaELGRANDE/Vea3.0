"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rutas = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../../modulos/usuarios/user.controller");
const productos_controller_1 = require("../../modulos/productos/productos.controller");
const auth_controller_1 = require("../../modulos/auth/auth.controller");
const sellers_controller_1 = require("../../modulos/sellers/sellers.controller");
const buyers_controller_1 = require("../../modulos/buyers/buyers.controller");
const catalogos_controller_1 = require("../../modulos/catalogos/catalogos.controller");
const sales_controller_1 = require("../../modulos/sales/sales.controller");
const reviews_controller_1 = require("../../modulos/reviews/reviews.controller");
const chat_controller_1 = require("../../modulos/chat/chat.controller");
const departments_controller_1 = require("../../modulos/departments/departments.controller");
// Importar el nuevo sistema de autenticación
const auth_1 = require("../../modulos/auth");
// Importar las rutas de archivos
const files_routes_1 = require("../../modulos/files/files.routes");
exports.rutas = express_1.default.Router();
const userController = new user_controller_1.UserController();
const productController = new productos_controller_1.ProductController();
const authController = new auth_controller_1.AuthController(); // Crear instancia de AuthController
const sellersController = new sellers_controller_1.SellersController();
const buyersController = new buyers_controller_1.BuyersController();
const catalogosController = new catalogos_controller_1.CatalogosController();
const salesController = new sales_controller_1.SalesController();
const reviewsController = new reviews_controller_1.ReviewsController();
const chatController = new chat_controller_1.ChatController();
const departmentsController = new departments_controller_1.DepartmentsController();
exports.rutas.get("/", (req, res) => {
    res.send("¡El proyecto está funcionando!");
});
// NUEVO SISTEMA DE AUTENTICACIÓN
// Utilizar las rutas del nuevo módulo de autenticación
exports.rutas.use("/api", auth_1.authenticationRoutes);
// RUTAS DE ARCHIVOS
// Utilizar las rutas del módulo de archivos
exports.rutas.use("/", files_routes_1.uploadRoutes);
// Rutas de Productos
exports.rutas.post("/products", (req, res) => productController.createProduct(req, res));
exports.rutas.get("/products", (req, res) => productController.getProducts(res));
exports.rutas.get("/products/allinfo", (req, res) => productController.getProductsAllInfo(req, res));
exports.rutas.get("/products/:id", (req, res) => productController.getProductById(req, res));
exports.rutas.put("/products/:id", (req, res) => productController.updateProduct(req, res));
exports.rutas.delete("/products/:id", (req, res) => productController.deleteProduct(req, res));
exports.rutas.get("/products/simplyFormat", (req, res) => productController.getProductsAllInfo(req, res));
// Rutas de Vendedores
exports.rutas.post("/sellers", (req, res) => sellersController.createSeller(req, res));
exports.rutas.get("/sellers", (req, res) => sellersController.getAllSellers(res));
exports.rutas.get("/sellers/:id", (req, res) => sellersController.getSellerById(req, res));
exports.rutas.put("/sellers/:id", (req, res) => sellersController.updateSeller(req, res));
exports.rutas.delete("/sellers/:id", (req, res) => sellersController.deleteSeller(req, res));
// Rutas de Compradores
exports.rutas.post("/buyers", (req, res) => buyersController.createBuyer(req, res));
exports.rutas.get("/buyers", (req, res) => buyersController.getAllBuyers(res));
exports.rutas.get("/buyers/:id", (req, res) => buyersController.getBuyerById(req, res));
exports.rutas.put("/buyers/:id", (req, res) => buyersController.updateBuyer(req, res));
exports.rutas.delete("/buyers/:id", (req, res) => buyersController.deleteBuyer(req, res));
exports.rutas.get("/buyers/user/:userId", (req, res) => buyersController.getBuyersByUserId(req, res));
// Rutas de Catálogos
// Categories
exports.rutas.get("/catalogos/categories", (req, res) => catalogosController.getCategories(res));
exports.rutas.get("/catalogos/categories/:id", (req, res) => catalogosController.getCategoryById(req, res));
// SELECT * FROM LIKE %SFSDFSDFDS% productos
// Publishing Status
exports.rutas.get("/catalogos/publishingstatus", (req, res) => catalogosController.getPublishingStatus(res));
exports.rutas.get("/catalogos/publishingstatus/:id", (req, res) => catalogosController.getPublishingStatusById(req, res));
// Sale Status
exports.rutas.get("/catalogos/salestatus", (req, res) => catalogosController.getSaleStatus(res));
exports.rutas.get("/catalogos/salestatus/:id", (req, res) => catalogosController.getSaleStatusById(req, res));
// Article Status
exports.rutas.get("/catalogos/articlestatus", (req, res) => catalogosController.getArticleStatus(res));
exports.rutas.get("/catalogos/articlestatus/:id", (req, res) => catalogosController.getArticleStatusById(req, res));
// Rutas de Ventas
exports.rutas.post("/sales", (req, res) => salesController.createSale(req, res));
exports.rutas.get("/sales", (req, res) => salesController.getSales(res));
exports.rutas.get("/sales/:id", (req, res) => salesController.getSaleById(req, res));
exports.rutas.put("/sales/:id", (req, res) => salesController.updateSale(req, res));
exports.rutas.delete("/sales/:id", (req, res) => salesController.deleteSale(req, res));
// Rutas de Reviews
exports.rutas.post("/reviews", (req, res) => reviewsController.createReview(req, res));
exports.rutas.get("/reviews", (req, res) => reviewsController.getReviews(res));
exports.rutas.get("/reviews/:id", (req, res) => reviewsController.getReviewById(req, res));
exports.rutas.put("/reviews/:id", (req, res) => reviewsController.updateReview(req, res));
exports.rutas.delete("/reviews/:id", (req, res) => reviewsController.deleteReview(req, res));
exports.rutas.get("/reviews/product/:publishingId/average-rating", (req, res) => reviewsController.getAverageRatingByPublishing(req, res));
// Rutas de Chat
exports.rutas.post("/chat", (req, res) => chatController.createChat(req, res));
exports.rutas.get("/chat", (req, res) => chatController.getChats(res));
exports.rutas.get("/chat/:id", (req, res) => chatController.getChatById(req, res));
exports.rutas.put("/chat/:id", (req, res) => chatController.updateChat(req, res));
exports.rutas.delete("/chat/:id", (req, res) => chatController.deleteChat(req, res));
exports.rutas.get("/chat/buyer/:buyerId", (req, res) => chatController.getChatsByBuyer(req, res));
exports.rutas.get("/chat/seller/:sellerId", (req, res) => chatController.getChatsBySeller(req, res));
exports.rutas.get("/chat/product/:publishingId", (req, res) => chatController.getChatsByPublishing(req, res));
exports.rutas.put("/chat/:id/enable", (req, res) => chatController.enableChat(req, res));
exports.rutas.put("/chat/:id/disable", (req, res) => chatController.disableChat(req, res));
// Rutas de Departments
exports.rutas.get("/departments", (req, res) => departmentsController.getDepartments(res));
exports.rutas.get("/departments/:id", (req, res) => departmentsController.getDepartmentById(req, res));
// Rutas de Municipalities
exports.rutas.get("/municipalities", (req, res) => departmentsController.getMunicipalities(res));
exports.rutas.get("/municipalities/:id", (req, res) => departmentsController.getMunicipalityById(req, res));
exports.rutas.get("/municipalities/department/:departmentId", (req, res) => departmentsController.getMunicipalitiesByDepartment(req, res));
