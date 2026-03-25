# Tienda de Comercio Electrónico

Aplicación web para explorar, filtrar y gestionar productos de moda. El proyecto está dividido en un frontend en React y un backend en Spring Boot, con autenticación, favoritos, carrito y administración.

## Funcionalidades

- Catálogo de productos por género y categoría
- Búsqueda y filtrado de productos
- Carrito de compra y favoritos
- Registro, inicio de sesión y JWT
- Panel de administración
- API REST para frontend y backend

## Tecnologías

### Frontend
- React 19
- Vite
- React Router DOM
- Axios
- Bootstrap 5
- TailwindCSS

### Backend
- Java 17
- Spring Boot 3.2.3
- Spring Security
- Spring Data JPA
- MySQL 8
- JWT
- Maven

## Requisitos

### Frontend
- Node.js 18 o superior
- npm

### Backend
- Java 17 o superior
- Maven
- MySQL 8

## Desarrollo local

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

## Variables de entorno

El backend usa estas variables:

- `DB_URL`
- `DB_USERNAME`
- `DB_PASSWORD`
- `JWT_SECRET`

El frontend usa:

- `VITE_API_BASE_URL`

## Estructura del proyecto

```text
TFG/
├─ ecom-catalog-react.Frontend/
│  ├─ src/
│  ├─ public/
│  └─ package.json
├─ productocatalogo.backend/
│  ├─ src/
│  └─ pom.xml
├─ producto-catalogo-backup-20250605.sql
├─ docker-compose.yml
├─ start-docker.ps1
└─ stop-docker.ps1
```

## Docker

Para arrancar todo el stack:

```powershell
.\start-docker.ps1
```

Para pararlo:

```powershell
.\stop-docker.ps1
```

Servicios expuestos:

- Frontend: http://localhost:8081
- Backend: http://localhost:8000
- Base de datos: localhost:3306

La primera vez, Docker importará el backup `producto-catalogo-backup-20250605.sql` en MySQL 8.
