# 📚 API Documentation - Vea 3.0

## 📊 Resumen de Verificación
- **Fecha de verificación:** 3 de junio de 2025
- **URL Base:** `http://localhost:3000/api`
- **Estado del servidor:** ✅ Funcionando correctamente
- **Base de datos:** MySQL (vea_db) ✅ Conectada
- **Total endpoints verificados:** 14 principales
- **Todos los endpoints GET principales:** ✅ Funcionando (Status 200)

## 🔧 Configuración Técnica

### Información del Servidor
- **Puerto:** 3000
- **Entorno:** Desarrollo (NODE_ENV=development)
- **Rate Limiting:** 100 requests por 15 minutos
- **Middleware de seguridad:** Helmet, Compression habilitados
- **Formato de datos:** JSON
- **Autenticación:** JWT Bearer Tokens

### Base de Datos
- **Motor:** MySQL
- **Base de datos:** vea_db
- **ORM:** TypeORM
- **Sincronización:** Habilitada en desarrollo
- **Estado:** ✅ Conectada y sincronizada

## 🔐 Autenticación

### Sistema Legacy (Mantener compatibilidad)
```
POST /api/auth/login
POST /api/auth/refresh-token  
POST /api/auth/logout
POST /api/auth/revoke-all-tokens (requiere autenticación)
```

### Sistema v2 (Recomendado)
```
POST /api/v2/auth/login
POST /api/v2/auth/register
POST /api/v2/auth/refresh-token
POST /api/v2/auth/logout
POST /api/v2/auth/forgot-password
POST /api/v2/auth/reset-password
GET  /api/v2/auth/profile (requiere autenticación)
POST /api/v2/auth/change-password (requiere autenticación)
GET  /api/v2/auth/sessions (requiere autenticación)
DELETE /api/v2/auth/sessions/:sessionId (requiere autenticación)
```

#### Ejemplo de Login (v2):
```json
POST /api/v2/auth/login
{
  "email": "usuario@example.com",
  "password": "contraseña123"
}
```

## 👥 Gestión de Usuarios

### Sistema Legacy
```
POST   /api/users          - Crear usuario (registro legacy)
GET    /api/users          - Obtener usuarios ✅
GET    /api/users/:id      - Obtener usuario por ID
PUT    /api/users/:id      - Actualizar usuario  
DELETE /api/users/:id      - Eliminar usuario
```

### Sistema v2 (Con roles y permisos)
```
GET    /api/v2/users                    - Obtener usuarios (solo admin)
GET    /api/v2/users/:id               - Obtener usuario por ID (autenticado)
GET    /api/v2/users/username/:username - Obtener por username (público)
GET    /api/v2/users/email/:email      - Obtener por email (solo admin)
PUT    /api/v2/users/:id               - Actualizar usuario (autenticado)
PATCH  /api/v2/users/:id/deactivate    - Desactivar usuario (solo admin)
PATCH  /api/v2/users/:id/activate      - Activar usuario (solo admin)
DELETE /api/v2/users/:id               - Eliminar usuario (solo admin)
```

## 📦 Productos
```
POST   /api/products     - Crear producto
GET    /api/products     - Obtener productos ✅
GET    /api/products/:id - Obtener producto por ID
PUT    /api/products/:id - Actualizar producto
DELETE /api/products/:id - Eliminar producto
```

## 🏪 Vendedores
```
POST   /api/sellers     - Crear vendedor
GET    /api/sellers     - Obtener vendedores ✅
GET    /api/sellers/:id - Obtener vendedor por ID
PUT    /api/sellers/:id - Actualizar vendedor
DELETE /api/sellers/:id - Eliminar vendedor
```

## 🛒 Compradores
```
POST   /api/buyers     - Crear comprador
GET    /api/buyers     - Obtener compradores ✅
GET    /api/buyers/:id - Obtener comprador por ID
PUT    /api/buyers/:id - Actualizar comprador
DELETE /api/buyers/:id - Eliminar comprador
```

## 📚 Catálogos (Solo lectura)

### Categorías
```
GET /api/catalogos/categories     - Obtener categorías ✅
GET /api/catalogos/categories/:id - Obtener categoría por ID
```

### Estados de Publicación
```
GET /api/catalogos/publishingstatus     - Obtener estados ✅
GET /api/catalogos/publishingstatus/:id - Obtener estado por ID
```

### Estados de Venta
```
GET /api/catalogos/salestatus     - Obtener estados ✅
GET /api/catalogos/salestatus/:id - Obtener estado por ID
```

### Estados de Artículo
```
GET /api/catalogos/articlestatus     - Obtener estados ✅
GET /api/catalogos/articlestatus/:id - Obtener estado por ID
```

## 💰 Ventas
```
POST   /api/sales     - Crear venta
GET    /api/sales     - Obtener ventas ✅
GET    /api/sales/:id - Obtener venta por ID
PUT    /api/sales/:id - Actualizar venta
DELETE /api/sales/:id - Eliminar venta
```

## ⭐ Reviews
```
POST /api/reviews                                      - Crear review
GET  /api/reviews                                      - Obtener reviews ✅
GET  /api/reviews/:id                                  - Obtener review por ID
PUT  /api/reviews/:id                                  - Actualizar review
DELETE /api/reviews/:id                                - Eliminar review
GET  /api/reviews/product/:publishingId/average-rating - Rating promedio
```

## 💬 Chat
```
POST /api/chat                           - Crear chat
GET  /api/chat                           - Obtener chats ✅
GET  /api/chat/:id                       - Obtener chat por ID
PUT  /api/chat/:id                       - Actualizar chat
DELETE /api/chat/:id                     - Eliminar chat
GET  /api/chat/buyer/:buyerId            - Chats por comprador
GET  /api/chat/seller/:sellerId          - Chats por vendedor
GET  /api/chat/product/:publishingId     - Chats por producto
PUT  /api/chat/:id/enable                - Habilitar chat
PUT  /api/chat/:id/disable               - Deshabilitar chat
```

## 🌍 Ubicaciones Geográficas

### Departamentos
```
GET /api/departments     - Obtener departamentos ✅
GET /api/departments/:id - Obtener departamento por ID
```

### Municipios
```
GET /api/municipalities                        - Obtener municipios ✅
GET /api/municipalities/:id                    - Obtener municipio por ID
GET /api/municipalities/department/:departmentId - Municipios por departamento
```

## 📋 Códigos de Estado HTTP

| Código | Descripción | Uso |
|--------|-------------|-----|
| **200** | OK | Solicitud exitosa |
| **201** | Created | Recurso creado exitosamente |
| **400** | Bad Request | Error en los datos enviados |
| **401** | Unauthorized | Token inválido o faltante |
| **403** | Forbidden | Sin permisos suficientes |
| **404** | Not Found | Recurso no encontrado |
| **429** | Too Many Requests | Rate limit excedido |
| **500** | Internal Server Error | Error interno del servidor |

## 🔒 Autenticación y Autorización

### Headers Requeridos
```http
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

### Roles de Usuario
- **admin:** Acceso completo a todos los recursos
- **seller:** Gestión de productos y ventas propias
- **buyer:** Compras y reviews
- **user:** Acceso básico

## 🧪 Ejemplos de Uso

### 1. Registro de Usuario
```bash
POST /api/v2/auth/register
Content-Type: application/json

{
  "name": "Juan Pérez",
  "email": "juan@example.com", 
  "password": "password123",
  "username": "juanperez"
}
```

### 2. Login
```bash
POST /api/v2/auth/login
Content-Type: application/json

{
  "email": "juan@example.com",
  "password": "password123"
}
```

### 3. Obtener Productos
```bash
GET /api/products
Authorization: Bearer <token>
```

### 4. Crear Producto
```bash
POST /api/products
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Producto de Prueba",
  "description": "Descripción del producto",
  "price": 99.99,
  "stock": 100
}
```

## 🔧 Herramientas de Prueba

### PowerShell (Windows)
```powershell
# GET request
Invoke-WebRequest -Uri "http://localhost:3000/api/products" -UseBasicParsing

# POST request
$body = @{
    name = "Producto Test"
    price = 100
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:3000/api/products" -Method POST -Body $body -ContentType "application/json"
```

### Curl (si está disponible)
```bash
# GET request
curl http://localhost:3000/api/products

# POST request
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name": "Producto Test", "price": 100}'
```

## 📝 Notas Importantes

1. **Sistema Dual:** La API mantiene compatibilidad con endpoints legacy y nuevos v2
2. **Rate Limiting:** 100 requests por 15 minutos por IP
3. **CORS:** Configurado para desarrollo
4. **Logging:** Todas las queries se logean en desarrollo
5. **Base de Datos:** Auto-sincronización habilitada en desarrollo
6. **Seguridad:** Helmet y compression habilitados

## 🚀 Estado del Servidor

- **✅ Servidor iniciado:** Puerto 3000
- **✅ Base de datos conectada:** vea_db
- **✅ Migraciones aplicadas:** Tablas sincronizadas
- **✅ Endpoints principales:** Respondiendo correctamente
- **✅ Middleware de seguridad:** Activo
- **✅ Rate limiting:** Configurado

---

**Documentación generada automáticamente el 3 de junio de 2025**  
**Servidor:** http://localhost:3000/api  
**Estado:** 🟢 Operacional
