# Configuración de Modos de Ejecución - TypeORM

## 📋 Resumen

Este proyecto ahora tiene una configuración inteligente de TypeORM que detecta automáticamente el modo de ejecución y aplica configuraciones optimizadas para cada caso.

## 🚀 Modos de Ejecución

### 1. Modo Development (`npm run start`)
- **Propósito**: Desarrollo básico sin auto-reload
- **Configuración**:
  - `synchronize: true` - Sincronización automática de esquemas
  - `logging: ['error', 'warn']` - Logging moderado
  - `cache: false` - Sin cache para desarrollo
  - Base de datos: `vea_db`

### 2. Modo Development con Nodemon (`npm run dev`)
- **Propósito**: Desarrollo con auto-reload y debugging detallado
- **Configuración**:
  - `synchronize: true` - Sincronización automática de esquemas
  - `logging: ['query', 'error', 'warn', 'info']` - Logging completo para debugging
  - `cache: false` - Sin cache para desarrollo
  - Auto-reload habilitado vía nodemon
  - Base de datos: `vea_db`

### 3. Modo Production (`npm run serve`)
- **Propósito**: Producción optimizada
- **Configuración**:
  - `synchronize: false` - **NUNCA** sincronizar en producción
  - `logging: ['error']` - Solo errores críticos
  - `cache: false` - Configuración simplificada
  - Configuración de conexión optimizada
  - Base de datos: `vea_db`

### 4. Modo Test (`NODE_ENV=test`)
- **Propósito**: Pruebas automatizadas
- **Configuración**:
  - `synchronize: true` - Sincronización para tests
  - `logging: false` - Sin logging en tests
  - `dropSchema: true` - Limpia la DB antes de cada test
  - Base de datos: `vea_db_test`

## 🔧 Configuración Técnica

### Detección de Modo
El sistema detecta el modo basándose en:

```typescript
const isProduction = env.NODE_ENV === 'production';
const isDevelopmentWithNodemon = process.env.npm_lifecycle_event === 'dev';
const isStartScript = process.env.npm_lifecycle_event === 'start';
const isTestMode = env.NODE_ENV === 'test';
```

### Variables de Entorno Requeridas
```env
# Base de datos principal
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=
DB_DATABASE=vea_db

# Base de datos para testing (opcional)
DB_TEST_DATABASE=vea_db_test

# Modo de aplicación
NODE_ENV=development|production|test
```

## 📦 Scripts NPM

```json
{
  "scripts": {
    "start": "cross-env NODE_ENV=development ts-node src/index.ts",
    "dev": "cross-env NODE_ENV=development nodemon src/index.ts",
    "build": "tsc",
    "serve": "cross-env NODE_ENV=production node dist/index.js"
  }
}
```

## 🛠️ Funciones Auxiliares

### `initializeDatabase()`
Inicializa la conexión con configuración automática:
```typescript
import { initializeDatabase } from './core/confi/data-source';

await initializeDatabase();
```

### `getDatabaseInfo()`
Obtiene información sobre la configuración actual:
```typescript
import { getDatabaseInfo } from './core/confi/data-source';

const info = getDatabaseInfo();
console.log(info.mode); // 'development' | 'dev-watch' | 'production' | 'test'
```

### `checkDatabaseConnection()`
Verifica el estado de la conexión:
```typescript
import { checkDatabaseConnection } from './core/confi/data-source';

if (checkDatabaseConnection()) {
  console.log('✅ Base de datos conectada');
}
```

## 🧪 Pruebas

### Probar Configuración
```bash
# Probar configuración actual
npx ts-node test-database-config.ts

# Demostrar diferencias entre modos
node demo-modos.js
```

### Verificar Modos Específicos
```bash
# Modo development básico
npm run start

# Modo development con nodemon
npm run dev

# Modo production (requiere build primero)
npm run build
npm run serve
```

## 📊 Comparación de Configuraciones

| Característica | Development | Dev + Nodemon | Production | Test |
|---|---|---|---|---|
| **Synchronize** | ✅ | ✅ | ❌ | ✅ |
| **Auto-reload** | ❌ | ✅ | ❌ | ❌ |
| **Query Logging** | ❌ | ✅ | ❌ | ❌ |
| **Error Logging** | ✅ | ✅ | ✅ | ❌ |
| **Drop Schema** | ❌ | ❌ | ❌ | ✅ |
| **Database** | vea_db | vea_db | vea_db | vea_db_test |

## 🔒 Mejores Prácticas

1. **Desarrollo**: Usa `npm run dev` para desarrollo activo
2. **Testing**: Usa `npm run start` para pruebas rápidas sin auto-reload
3. **Producción**: SIEMPRE usa `npm run serve` después de `npm run build`
4. **Migraciones**: En producción, ejecuta migraciones manualmente antes del deploy

## 🐛 Troubleshooting

### Error de conexión
- Verifica las variables de entorno en `.env`
- Asegúrate de que MySQL esté corriendo
- Verifica permisos de usuario de base de datos

### Problemas de sincronización
- En development: `synchronize: true` está habilitado
- En production: Usa migraciones manuales
- Revisa logs para errores de esquema

### Auto-reload no funciona
- Verifica que estés usando `npm run dev`
- Revisa configuración en `nodemon.json`
- Asegúrate de que los archivos estén en `src/`
