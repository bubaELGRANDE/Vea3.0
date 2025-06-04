# API Service - Servicio de API Reutilizable

Este servicio proporciona una interfaz unificada para realizar llamadas a la API, integrando todas las rutas definidas en `endpoints.ts`.

## Características

- ✅ Métodos genéricos HTTP (GET, POST, PUT, PATCH, DELETE)
- ✅ Métodos específicos para cada endpoint de la API
- ✅ Manejo automático de parámetros dinámicos en URLs
- ✅ Tipado con TypeScript
- ✅ Configuración centralizada de la URL base
- ✅ Soporte para opciones de request (headers, params, credentials)

## Configuración

### 1. Configuración del HttpClient

Ya está configurado en `app.config.ts`:

```typescript
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    // otros providers...
    provideHttpClient(withInterceptorsFromDi())
  ]
};
```

### 2. Variables de Entorno

Configuradas en `environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'
};
```

## Uso Básico

### Inyección del Servicio

```typescript
import { ApiService } from './core/services/api.service';

constructor(private apiService: ApiService) {}
```

### Métodos Genéricos

```typescript
// GET request
this.apiService.get<any[]>('/users').subscribe(response => {
  console.log(response);
});

// POST request
this.apiService.post('/users', userData).subscribe(response => {
  console.log(response);
});

// PUT request con parámetros dinámicos
this.apiService.put('/users/:id', userData, { id: 123 }).subscribe(response => {
  console.log(response);
});

// DELETE request
this.apiService.delete('/users/:id', { id: 123 }).subscribe(response => {
  console.log(response);
});
```

### Métodos Específicos

El servicio incluye métodos específicos para cada endpoint:

#### Autenticación
```typescript
// Login
this.apiService.login({ email: 'user@example.com', password: 'password' })
  .subscribe(response => {
    console.log('Login exitoso:', response);
  });

// Registro
this.apiService.register(userData).subscribe(response => {
  console.log('Registro exitoso:', response);
});

// Recuperar contraseña
this.apiService.forgotPassword({ email: 'user@example.com' })
  .subscribe(response => {
    console.log('Email enviado:', response);
  });
```

#### Usuarios
```typescript
// Obtener todos los usuarios
this.apiService.getUsers().subscribe(users => {
  console.log(users);
});

// Obtener usuario por ID
this.apiService.getUserById(123).subscribe(user => {
  console.log(user);
});

// Crear usuario
this.apiService.createUser(userData).subscribe(response => {
  console.log('Usuario creado:', response);
});

// Actualizar usuario
this.apiService.updateUser(123, userData).subscribe(response => {
  console.log('Usuario actualizado:', response);
});
```

#### Publicaciones
```typescript
// Obtener publicaciones
this.apiService.getPublications().subscribe(publications => {
  console.log(publications);
});

// Crear publicación
this.apiService.createPublication(publicationData).subscribe(response => {
  console.log('Publicación creada:', response);
});

// Búsqueda de publicaciones
this.apiService.searchPublications().subscribe(results => {
  console.log('Resultados:', results);
});
```

#### Catálogos
```typescript
// Obtener categorías
this.apiService.getCategories().subscribe(categories => {
  console.log(categories);
});

// Obtener departamentos
this.apiService.getDepartments().subscribe(departments => {
  console.log(departments);
});

// Obtener municipios por departamento
this.apiService.getMunicipalitiesByDepartment(departmentId)
  .subscribe(municipalities => {
    console.log(municipalities);
  });
```

## Integración con UserService

El `UserService` ya está configurado para usar el `ApiService`:

```typescript
import { UserService } from './core/services/user.service';

constructor(private userService: UserService) {}

// Usar métodos de autenticación
this.userService.login(credentials).subscribe(response => {
  // Manejar respuesta de login
});

// Usar métodos de usuario
this.userService.getUsers().subscribe(users => {
  // Manejar lista de usuarios
});
```

## Manejo de Errores

```typescript
this.apiService.getUsers().subscribe({
  next: (response) => {
    console.log('Éxito:', response);
  },
  error: (error) => {
    console.error('Error:', error);
    // Manejar error específico
    if (error.status === 401) {
      // Redirect to login
    }
  }
});
```

## Opciones Avanzadas

### Headers Personalizados

```typescript
const options = {
  headers: {
    'Authorization': 'Bearer ' + token,
    'Content-Type': 'application/json'
  }
};

this.apiService.get('/protected-endpoint', undefined, options)
  .subscribe(response => {
    console.log(response);
  });
```

### Query Parameters

```typescript
const options = {
  params: {
    page: '1',
    limit: '10',
    search: 'term'
  }
};

this.apiService.get('/publications', undefined, options)
  .subscribe(response => {
    console.log(response);
  });
```

## Endpoints Disponibles

El servicio integra todos los endpoints definidos en `endpoints.ts`:

- **Auth**: login, register, forgotPassword, refreshToken, logout, revokeAllTokens
- **Users**: getUsers, getUserById, createUser, updateUser, deleteUser, updateProfile, changePassword
- **Publications**: getPublications, getPublicationById, createPublication, updatePublication, deletePublication, searchPublications
- **Sales**: getSales, getSaleById, createSale, updateSale, deleteSale
- **Reviews**: getReviews, getReviewById, createReview, updateReview, deleteReview
- **Chat**: getChats, getChatById, createChat, updateChat, deleteChat, enableChat, disableChat
- **Sellers**: getSellers, getSellerById, createSeller, updateSeller, deleteSeller
- **Buyers**: getBuyers, getBuyerById, createBuyer, updateBuyer, deleteBuyer
- **Catalogos**: getCategories, getPublishingStatus, getSaleStatus, getArticleStatus
- **Departments**: getDepartments, getDepartmentById, getMunicipalities, getMunicipalityById, getMunicipalitiesByDepartment

## Ejemplo Completo

Ver el componente `ExampleApiUsageComponent` para un ejemplo completo de uso del servicio.

## Notas

- El servicio maneja automáticamente la construcción de URLs con parámetros dinámicos
- Todas las respuestas están tipadas con TypeScript
- El servicio es singleton y se puede inyectar en cualquier componente o servicio
- La configuración de la URL base se maneja a través de las variables de entorno
