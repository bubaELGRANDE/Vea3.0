import express, { Request, Response } from "express";
import { UserController } from "../../modulos/usuarios/usuarios.controller";
import { ProductController } from "../../modulos/productos/productos.controller";
import { AuthController } from "../../modulos/auth/auth.controller";
import { SellersController } from "../../modulos/sellers/sellers.controller";
import { BuyersController } from "../../modulos/buyers/buyers.controller";
import { CatalogosController } from '../../modulos/catalogos/catalogos.controller';

export const rutas = express.Router();

const userController = new UserController();
const productController = new ProductController();
const authController = new AuthController(); // Crear instancia de AuthController
const sellersController = new SellersController();
const buyersController = new BuyersController();
const catalogosController = new CatalogosController();

rutas.get("/", (req: Request, res: Response) => {
    res.send("¡El proyecto está funcionando!");
});

// Rutas de Usuarios
rutas.post("/users", (req: Request, res: Response) => userController.createUser(req, res));
rutas.get("/users", (req: Request, res: Response) => userController.getUsers(req, res));
rutas.get("/users/:id", (req: Request, res: Response) => userController.getUserById(req, res));
rutas.put("/users/:id", (req: Request, res: Response) => userController.updateUser(req, res));
rutas.delete("/users/:id", (req: Request, res: Response) => userController.deleteUser(req, res));

// Rutas de Productos
rutas.post("/products", (req: Request, res: Response) => productController.createProduct(req, res));
rutas.get("/products", (req: Request, res: Response) => productController.getProducts(req, res));
rutas.get("/products/:id", (req: Request, res: Response) => productController.getProductById(req, res));
rutas.put("/products/:id", (req: Request, res: Response) => productController.updateProduct(req, res));

// Rutas de Autenticación
rutas.post("/auth/login", (req: Request, res: Response) => authController.login(req, res));
rutas.post("/auth/refresh-token", (req: Request, res: Response) => authController.refreshToken(req, res));
rutas.post("/auth/logout", (req: Request, res: Response) => authController.logout(req, res));

// Rutas de Vendedores
rutas.post("/sellers", (req: Request, res: Response) => sellersController.createSeller(req, res));
rutas.get("/sellers", (req: Request, res: Response) => sellersController.getAllSellers(req, res));
rutas.get("/sellers/:id", (req: Request, res: Response) => sellersController.getSellerById(req, res));
rutas.put("/sellers/:id", (req: Request, res: Response) => sellersController.updateSeller(req, res));
rutas.delete("/sellers/:id", (req: Request, res: Response) => sellersController.deleteSeller(req, res));

// Rutas de Compradores
rutas.post("/buyers", (req: Request, res: Response) => buyersController.createBuyer(req, res));
rutas.get("/buyers", (req: Request, res: Response) => buyersController.getAllBuyers(req, res));
rutas.get("/buyers/:id", (req: Request, res: Response) => buyersController.getBuyerById(req, res));
rutas.put("/buyers/:id", (req: Request, res: Response) => buyersController.updateBuyer(req, res));
rutas.delete("/buyers/:id", (req: Request, res: Response) => buyersController.deleteBuyer(req, res));

// Rutas de Catálogos
rutas.get("/catalogos/categories", (req: Request, res: Response) => catalogosController.getCategories(req, res));
rutas.get("/catalogos/publishingstatus", (req: Request, res: Response) => catalogosController.getPublishingStatus(req, res));
rutas.get("/catalogos/salestatus", (req: Request, res: Response) => catalogosController.getSaleStatus(req, res));