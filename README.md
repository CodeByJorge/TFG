# Tienda de Comercio ElectrÃ³nico 

## DescripciÃ³n
AplicaciÃ³n web moderna para la gestiÃ³n y visualizaciÃ³n de productos de moda, desarrollada con tecnologÃ­as actuales y siguiendo las mejores prÃ¡cticas de desarrollo. El sistema permite a los usuarios explorar productos, gestionar favoritos, realizar compras y administrar su perfil, mientras que los administradores tienen acceso a un panel completo para la gestiÃ³n de productos, pedidos y usuarios.

## CaracterÃ­sticas Principales

### Frontend
- Interfaz de usuario moderna y responsiva desarrollada con React
- NavegaciÃ³n intuitiva con React Router
- GestiÃ³n de estado global con Context API
- DiseÃ±o adaptable a diferentes dispositivos
- Sistema de filtrado avanzado de productos
- Carrito de compras en tiempo real
- GestiÃ³n de favoritos
- Panel de administraciÃ³n completo
- AutenticaciÃ³n y autorizaciÃ³n de usuarios
- BÃºsqueda en tiempo real
- Notificaciones interactivas

### Backend
- API RESTful desarrollada con Spring Boot
- Seguridad implementada con Spring Security y JWT
- Persistencia de datos con JPA y MySQL
- GestiÃ³n de usuarios y roles
- Sistema de autenticaciÃ³n robusto
- Manejo de productos y categorÃ­as
- GestiÃ³n de pedidos
- ValidaciÃ³n de datos
- DocumentaciÃ³n de API

## TecnologÃ­as Utilizadas

### Frontend
- React 19
- React Router DOM
- Axios
- Bootstrap 5
- TailwindCSS
- Vite
- ESLint
- PostCSS

### Backend
- Java 17
- Spring Boot 3.2.3
- Spring Security
- Spring Data JPA
- MySQL
- JWT
- Lombok
- Maven

## Requisitos del Sistema

### Frontend
- Node.js (versiÃ³n 18 o superior)
- npm o yarn
- Navegador web moderno

### Backend
- Java 17 o superior
- Maven
- MySQL 8.0 o superior

## InstalaciÃ³n

### Frontend
```bash
cd ecom-catalog-react.Frontend
npm install
npm run dev
```

### Backend
```bash
cd productocatalogo.backend
mvn clean install
mvn spring-boot:run
```

## ConfiguraciÃ³n

### Base de Datos
1. Crear una base de datos MySQL
2. Configurar las credenciales en `application.properties`
3. Ejecutar el script SQL inicial

### Variables de Entorno
Configurar las siguientes variables en el backend:
- `JWT_SECRET`
- `DB_URL`
- `DB_USERNAME`
- `DB_PASSWORD`

## Estructura del Proyecto
```
â”œâ”€â”€ ecom-catalog-react.Frontend/
â”‚   â”œâ”€â”€ src/
â”‚   â”‚   â”œâ”€â”€ assets/           # ImÃ¡genes, Ã­conos, etc.
â”‚   â”‚   â”œâ”€â”€ components/       # Componentes reutilizables (botones, tarjetas, etc.)
â”‚   â”‚   â”œâ”€â”€ context/          # Contextos de React
â”‚   â”‚   â”œâ”€â”€ contexts/         # (Posible duplicado, revisar)
â”‚   â”‚   â”œâ”€â”€ pages/            # PÃ¡ginas del sitio
â”‚   â”‚   â”‚   â””â”€â”€ admin/        # Panel de administraciÃ³n
â”‚   â”‚   â”œâ”€â”€ services/         # Llamadas a la API
â”‚   â”‚   â”œâ”€â”€ App.jsx           # Componente raÃ­z
â”‚   â”‚   â”œâ”€â”€ Header.jsx        # Encabezado de navegaciÃ³n
â”‚   â”‚   â”œâ”€â”€ Cart.jsx          # Vista del carrito
â”‚   â”‚   â”œâ”€â”€ config.js         # ConfiguraciÃ³n global (URL API, etc.)
â”‚   â”‚   â””â”€â”€ main.jsx          # Punto de entrada
â”‚   â””â”€â”€ public/               # Archivos estÃ¡ticos pÃºblicos (favicon, index.html, etc.)
â”‚
â””â”€â”€ productocatalogo.backend/
    â”œâ”€â”€ src/
    â”‚   â””â”€â”€ main/
    â”‚       â”œâ”€â”€ java/com/producto/productocatalogo/
    â”‚       â”‚   â”œâ”€â”€ config/         # Configuraciones de CORS, Swagger, etc.
    â”‚       â”‚   â”œâ”€â”€ controller/     # Endpoints REST
    â”‚       â”‚   â”œâ”€â”€ exception/      # Clases para manejar errores personalizados
    â”‚       â”‚   â”œâ”€â”€ model/          # Entidades JPA (Producto, CategorÃ­a, Usuario, etc.)
    â”‚       â”‚   â”œâ”€â”€ repository/     # Interfaces JpaRepository
    â”‚       â”‚   â”œâ”€â”€ security/       # Filtros JWT, configuraciÃ³n de seguridad
    â”‚       â”‚   â””â”€â”€ service/        # Servicios con lÃ³gica de negocio
    â”‚       â””â”€â”€ resources/
    â”‚           â””â”€â”€ application.properties
    â””â”€â”€ pom.xml
```

## CaracterÃ­sticas de Seguridad
- AutenticaciÃ³n basada en JWT
- ProtecciÃ³n contra CSRF
- ValidaciÃ³n de datos
- SanitizaciÃ³n de entradas
- Control de acceso basado en roles
- EncriptaciÃ³n de contraseÃ±as
- Headers de seguridad
## Arranque con Docker

Para levantar todo el stack:

```bash
powershell -ExecutionPolicy Bypass -File .\start-docker.ps1
```

Servicios:

- Frontend: http://localhost:8081
- Backend: http://localhost:8000
- Base de datos: localhost:3306

La primera vez, Docker importará el backup `producto-catalogo-backup-20250605.sql` en MySQL 8.



Para detener el stack:

```bash
powershell -ExecutionPolicy Bypass -File .\stop-docker.ps1
```
