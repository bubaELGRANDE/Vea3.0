import express, { Request, Response } from "express";
import { UserController } from "../../modulos/usuarios/usuarios.controller";
import { ProductController } from "../../modulos/productos/productos.controller";
import { AuthController } from "../../modulos/auth/auth.controller"; // Importar AuthController

export const rutas = express.Router();

const userController = new UserController();
const productController = new ProductController();
const authController = new AuthController(); // Crear instancia de AuthController

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
rutas.delete("/products/:id", (req: Request, res: Response) => productController.deleteProduct(req, res));

// Rutas de Autenticación
rutas.post("/auth/login", (req: Request, res: Response) => authController.login(req, res));
rutas.post("/auth/refresh-token", (req: Request, res: Response) => authController.refreshToken(req, res));
rutas.post("/auth/logout", (req: Request, res: Response) => authController.logout(req, res));