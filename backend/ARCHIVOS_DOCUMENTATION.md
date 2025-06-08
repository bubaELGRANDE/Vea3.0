# Sistema de Gestión de Archivos

Este módulo proporciona un sistema completo para la gestión de archivos en la aplicación, incluyendo subida, descarga, eliminación y listado de archivos.

## Configuración

### Multer Config (`src/core/middleware/multer.config.ts`)

La configuración de Multer incluye:

- **Almacenamiento**: Los archivos se guardan en el directorio `uploads/`
- **Nombrado**: Se genera un nombre único para cada archivo
- **Filtros**: Solo se permiten ciertos tipos de archivos
- **Límites**: 
  - Tamaño máximo por archivo: 10MB
  - Máximo de archivos por request: 10

### Tipos de archivo permitidos:
- Imágenes: JPEG, JPG, PNG, GIF, WebP
- Documentos: PDF, TXT, DOC, DOCX

## Características de preservación de formato

### 1. **Preservación de extensiones originales**
- El sistema mantiene automáticamente la extensión del archivo original
- Si no hay extensión, se determina desde el tipo MIME
- Los nombres se generan como: `nombre-original-timestamp-random.extension`

### 2. **Tipos MIME correctos**
- Los archivos se sirven con el tipo MIME apropiado
- Permite visualización directa de imágenes en navegadores
- Documentos se manejan según su tipo específico

### 3. **Doble modo de acceso**
- **Visualización**: `GET /api/files/:filename` - Para mostrar directamente (imágenes, PDFs)
- **Descarga**: `GET /api/files/:filename/download` - Para forzar descarga

### 4. **Validación de integridad**
- Verificación de que la extensión coincida con el tipo MIME
- Validación de existencia y accesibilidad del archivo
- Información detallada del estado del archivo

## Rutas disponibles

### 1. Subir un archivo único
```
POST /api/upload
Content-Type: multipart/form-data
Campo: file
```

**Respuesta exitosa:**
```json
{
  "success": true,
  "message": "Archivo subido exitosamente",
  "data": {
    "filename": "imagen-1234567890-123456789.jpg",
    "originalName": "imagen.jpg",
    "size": 2048576,
    "mimetype": "image/jpeg",
    "extension": ".jpg",
    "path": "uploads/imagen-1234567890-123456789.jpg",
    "url": "/api/files/imagen-1234567890-123456789.jpg",
    "downloadUrl": "/api/files/imagen-1234567890-123456789.jpg/download"
  }
}
```

### 2. Subir múltiples archivos
```
POST /api/upload-multiple
Content-Type: multipart/form-data
Campo: files (múltiple)
```

**Respuesta exitosa:**
```json
{
  "success": true,
  "message": "3 archivo(s) subido(s) exitosamente",
  "data": {
    "count": 3,
    "files": [
      {
        "filename": "archivo1-1234567890-123456789.pdf",
        "originalName": "archivo1.pdf",
        "size": 1024000,
        "mimetype": "application/pdf",
        "extension": ".pdf",
        "path": "uploads/archivo1-1234567890-123456789.pdf",
        "url": "/api/files/archivo1-1234567890-123456789.pdf",
        "downloadUrl": "/api/files/archivo1-1234567890-123456789.pdf/download"
      }
    ]
  }
}
```

### 3. Obtener/Visualizar archivo
```
GET /api/files/:filename
```

Devuelve el archivo con el tipo MIME correcto para visualización directa en el navegador (especialmente útil para imágenes).

### 4. Descargar archivo (forzar descarga)
```
GET /api/files/:filename/download
```

Fuerza la descarga del archivo en lugar de mostrarlo en el navegador.

### 5. Obtener información de archivo
```
GET /api/files/:filename/info
```

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "filename": "imagen-1234567890-123456789.jpg",
    "size": 2048576,
    "extension": ".jpg",
    "mimetype": "image/jpeg",
    "created": "2025-06-08T10:30:00.000Z",
    "modified": "2025-06-08T10:30:00.000Z",
    "isFile": true,
    "url": "/api/files/imagen-1234567890-123456789.jpg",
    "downloadUrl": "/api/files/imagen-1234567890-123456789.jpg/download"
  }
}
```

### 6. Verificar integridad de archivo
```
GET /api/files/:filename/verify
```

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "filename": "imagen-1234567890-123456789.jpg",
    "exists": true,
    "readable": 4,
    "size": 2048576,
    "extension": ".jpg",
    "expectedMimeType": "image/jpeg",
    "isValid": true,
    "lastModified": "2025-06-08T10:30:00.000Z"
  }
}
```

### 7. Eliminar archivo
```
DELETE /api/files/:filename
```

**Respuesta:**
```json
{
  "success": true,
  "message": "Archivo eliminado exitosamente"
}
```

### 8. Listar todos los archivos
```
GET /api/files
```

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "count": 5,
    "files": [
      {
        "filename": "imagen-1234567890-123456789.jpg",
        "size": 2048576,
        "extension": ".jpg",
        "mimetype": "image/jpeg",
        "created": "2025-06-08T10:30:00.000Z",
        "modified": "2025-06-08T10:30:00.000Z",
        "url": "/api/files/imagen-1234567890-123456789.jpg",
        "downloadUrl": "/api/files/imagen-1234567890-123456789.jpg/download"
      }
    ]
  }
}
```

## Manejo de errores

El sistema incluye manejo completo de errores:

- **400 Bad Request**: Archivo no válido, tipo no permitido, etc.
- **404 Not Found**: Archivo no encontrado
- **500 Internal Server Error**: Errores del servidor

### Errores específicos de Multer:

- `LIMIT_FILE_SIZE`: Archivo demasiado grande (>10MB)
- `LIMIT_FILE_COUNT`: Demasiados archivos (>10)
- `LIMIT_UNEXPECTED_FILE`: Campo de archivo inesperado
- Tipo de archivo no permitido

## Uso en el frontend

### Ejemplo con JavaScript/Fetch:

```javascript
// Subir un archivo
const formData = new FormData();
formData.append('file', fileInput.files[0]);

fetch('/api/upload', {
  method: 'POST',
  body: formData
})
.then(response => response.json())
.then(data => {
  if (data.success) {
    console.log('Archivo subido:', data.data.url);
  }
});

// Subir múltiples archivos
const formData = new FormData();
for (let i = 0; i < fileInput.files.length; i++) {
  formData.append('files', fileInput.files[i]);
}

fetch('/api/upload-multiple', {
  method: 'POST',
  body: formData
})
.then(response => response.json())
.then(data => {
  if (data.success) {
    console.log('Archivos subidos:', data.data.count);
  }
});
```

### Ejemplo con Angular:

```typescript
uploadFile(file: File): Observable<any> {
  const formData = new FormData();
  formData.append('file', file);
  
  return this.http.post('/api/upload', formData);
}

uploadMultipleFiles(files: FileList): Observable<any> {
  const formData = new FormData();
  for (let i = 0; i < files.length; i++) {
    formData.append('files', files[i]);
  }
  
  return this.http.post('/api/upload-multiple', formData);
}
```

## Seguridad

- Validación de tipos de archivo
- Límites de tamaño
- Nombres de archivo únicos para evitar conflictos
- Manejo seguro de rutas de archivo

## Estructura de archivos

```
src/
├── core/
│   └── middleware/
│       └── multer.config.ts     # Configuración de Multer
└── modulos/
    └── files/
        └── files.routes.ts      # Rutas de archivos
```
