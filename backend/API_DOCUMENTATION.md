# API Documentation - Vea 3.0

Fecha de prueba: 06/03/2025 16:09:13
URL Base: http://localhost:3000/api
Total endpoints probados: 14
Endpoints exitosos:              .Count
Endpoints con errores: .Count

## Endpoints Principales
âœ… GET / - Endpoint raiz - Status: 200
âœ… GET /users - Obtener usuarios - Status: 200
âœ… GET /products - Obtener productos - Status: 200
âœ… GET /sellers - Obtener vendedores - Status: 200
âœ… GET /buyers - Obtener compradores - Status: 200
âœ… GET /sales - Obtener ventas - Status: 200
âœ… GET /reviews - Obtener reviews - Status: 200
âœ… GET /chat - Obtener chats - Status: 200
âœ… GET /departments - Obtener departamentos - Status: 200
âœ… GET /municipalities - Obtener municipios - Status: 200
âœ… GET /catalogos/categories - Obtener categorias - Status: 200
âœ… GET /catalogos/publishingstatus - Estados publicacion - Status: 200
âœ… GET /catalogos/salestatus - Estados venta - Status: 200
âœ… GET /catalogos/articlestatus - Estados articulo - Status: 200

## Modulos de la API

### Autenticacion
- POST /auth/login - Iniciar sesion (Legacy)
- POST /v2/auth/login - Iniciar sesion (v2)
- POST /v2/auth/register - Registrar usuario
- POST /auth/refresh-token - Renovar token
- POST /auth/logout - Cerrar sesion

### Usuarios
- GET /users - Obtener todos los usuarios
- GET /users/:id - Obtener usuario por ID
- POST /users - Crear nuevo usuario
- PUT /users/:id - Actualizar usuario
- DELETE /users/:id - Eliminar usuario

### Productos  
- GET /products - Obtener productos
- GET /products/:id - Producto por ID
- POST /products - Crear producto
- PUT /products/:id - Actualizar producto
- DELETE /products/:id - Eliminar producto

### Vendedores
- GET /sellers - Obtener vendedores
- GET /sellers/:id - Vendedor por ID
- POST /sellers - Crear vendedor
- PUT /sellers/:id - Actualizar vendedor
- DELETE /sellers/:id - Eliminar vendedor

### Compradores
- GET /buyers - Obtener compradores
- GET /buyers/:id - Comprador por ID
- POST /buyers - Crear comprador
- PUT /buyers/:id - Actualizar comprador
- DELETE /buyers/:id - Eliminar comprador

### Ventas
- GET /sales - Obtener ventas
- GET /sales/:id - Venta por ID
- POST /sales - Crear venta
- PUT /sales/:id - Actualizar venta
- DELETE /sales/:id - Eliminar venta

### Reviews
- GET /reviews - Obtener reviews
- GET /reviews/:id - Review por ID
- POST /reviews - Crear review
- PUT /reviews/:id - Actualizar review
- DELETE /reviews/:id - Eliminar review
- GET /reviews/product/:publishingId/average-rating - Rating promedio

### Chat
- GET /chat - Obtener chats
- GET /chat/:id - Chat por ID
- POST /chat - Crear chat
- PUT /chat/:id - Actualizar chat
- DELETE /chat/:id - Eliminar chat
- GET /chat/buyer/:buyerId - Chats por comprador
- GET /chat/seller/:sellerId - Chats por vendedor
- GET /chat/product/:publishingId - Chats por producto

### Catalogos
- GET /catalogos/categories - Obtener categorias
- GET /catalogos/publishingstatus - Estados de publicacion
- GET /catalogos/salestatus - Estados de venta
- GET /catalogos/articlestatus - Estados de articulo

### Ubicaciones
- GET /departments - Obtener departamentos
- GET /departments/:id - Departamento por ID
- GET /municipalities - Obtener municipios
- GET /municipalities/:id - Municipio por ID
- GET /municipalities/department/:departmentId - Municipios por departamento

## Configuracion

- URL Base: http://localhost:3000/api
- Rate Limiting: 100 requests por 15 minutos
- Formato: JSON
- Autenticacion: Bearer Token (JWT)
- Base de datos: MySQL (vea_db)

## Codigos de Estado

- 200: OK
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 429: Too Many Requests
- 500: Internal Server Error

Documentacion generada el 06/03/2025 16:09:13
