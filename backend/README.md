# Vea3.0 Backend

API REST para una plataforma de e-commerce básica, desarrollada con Node.js, TypeScript, Express y TypeORM.

## Características

- Gestión de usuarios (registro, actualización, eliminación)
- Autenticación JWT (login, refresh token, logout)
- CRUD de productos con categorías y estados
- Estructura modular (controladores, servicios, modelos)
- Conexión a MySQL mediante TypeORM
- Validación de datos con `class-validator`

## Tecnologías

- Node.js
- TypeScript
- Express
- TypeORM
- MySQL
- class-validator
- dotenv

## Requisitos

- Node.js v16+
- MySQL 5.7+

## Instalación

1. Clonar el repositorio y entrar en la carpeta del backend:

   ```powershell
   git clone <repo_url>
   cd conexion\Vea3.0\backend
   ```

2. Instalar dependencias:

   ```powershell
   npm install
   ```

3. Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

   ```dotenv
   HOST=localhost
   DB_PORT=3306
   DB_USERNAME=root
   DB_PASSWORD=
   DB_DATABASE=vea_db
   PORT=3000
   JWT_SECRET=tu_secreto_jwt
   JWT_REFRESH_SECRET=tu_secreto_refresh
   ```

4. Compilar TypeScript y arrancar el servidor en modo desarrollo:

   ```powershell
   npm run dev
   ```

5. El servidor quedará activo en `http://localhost:3000/api`.

## Scripts disponibles

- `npm run build` — Compila el proyecto a JavaScript.
- `npm run start` — Arranca el servidor a partir de los archivos compilados.
- `npm run dev` — Arranca el servidor en modo desarrollo con reinicios automáticos.

## Endpoints principales

Base: `/api`

### Usuarios

- `POST /users` — Crear usuario
  Request:
  ```json
  {
    "name": "Ana García",
    "username": "anag",
    "email": "ana@example.com",
    "password": "MiClave123",
    "img": "https://...",
    "isActive": true
  }
  ```

- `GET /users` — Listar todos los usuarios
- `GET /users/:id` — Obtener un usuario por ID
- `PUT /users/:id` — Actualizar usuario
- `DELETE /users/:id` — Eliminar usuario

### Autenticación

- `POST /auth/login` — Login
  Request:
  ```json
  { "email": "ana@example.com", "password": "MiClave123" }
  ```
  Response:
  ```json
  { "accessToken": "...", "refreshToken": "...", "expiresIn": 3600 }
  ```

- `POST /auth/refresh-token` — Refrescar token
- `POST /auth/logout` — Logout

### Productos

- `POST /products` — Crear producto
- `GET /products` — Listar productos
- `GET /products/:id` — Obtener producto por ID
- `PUT /products/:id` — Actualizar producto
- `DELETE /products/:id` — Eliminar producto

Request ejemplo para crear producto:
```json
{
  "statusId": 1,
  "sellerId": 42,
  "title": "Cámara Réflex",
  "article": "Electrónica",
  "description": "DSLR 24MP con lente 18-55mm.",
  "price": 450.99,
  "type": 2,
  "categoryId": 5
}
```

## Notas y mejoras recomendadas

- Desactivar `synchronize` y usar migraciones en producción.
- Añadir manejo global de errores y logging.
- Implementar módulos de carrito de compras, órdenes y pasarela de pago.
- Añadir validación más exhaustiva de entradas.
- Incluir tests unitarios e integración.
- Configurar CI/CD y monitorización.

---

_Proyecto generado para servir como punto de partida de un backend de e-commerce._
