# Producto Catalogo Backend

Este es el backend de la aplicacion Producto Catalogo, desarrollado con Spring Boot.

## Requisitos Previos

- Java 17 o superior
- MySQL 8.0 o superior
- Maven

## Configuracion de la Base de Datos

1. Crear la base de datos:
```sql
CREATE DATABASE `producto-catalogo`;
```

2. Crear un usuario para la aplicacion y asignarle permisos sobre esa base de datos.
   Usa tus propias credenciales locales, no las del repositorio.

3. Restaurar la base de datos desde el backup (opcional):
```bash
mysql -u tu_usuario -p producto-catalogo < producto-catalogo-backup-20250605.sql
```

## Configuracion del Proyecto

### Variables de Entorno
Crear un archivo `.env.local` en la raiz del backend con el siguiente contenido.
Si prefieres, puedes copiar el archivo `.env.example` y renombrarlo:
```properties
DB_URL=jdbc:mysql://localhost:3306/producto-catalogo
DB_USERNAME=tu_usuario
DB_PASSWORD=tu_password
JWT_SECRET=una_clave_larga_y_segura_de_al_menos_32_caracteres
```

### Configuracion de Spring Boot
El archivo `application.properties` esta configurado para leer primero `.env.local` y luego `.env` si existen:
```properties
spring.application.name=productocatalogo
server.port=8000

spring.config.import=optional:file:.env.local[.properties],optional:file:.env[.properties]

# Database Configuration
spring.datasource.url=${DB_URL:jdbc:mysql://localhost:3306/producto-catalogo}
spring.datasource.username=${DB_USERNAME:admin}
spring.datasource.password=${DB_PASSWORD:}
spring.jpa.hibernate.ddl-auto=update

# JWT Configuration
security.jwt.secret=${JWT_SECRET:}

# Logging Configuration
logging.level.org.springframework=INFO
logging.level.com.producto=INFO
```

## Estructura del Proyecto

```
productocatalogo.backend/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── producto/
│   │   │           └── productocatalogo/
│   │   │               ├── config/
│   │   │               ├── controller/
│   │   │               ├── exception/
│   │   │               ├── model/
│   │   │               ├── repository/
│   │   │               ├── security/
│   │   │               └── Service/
│   │   └── resources/
│   │       └── application.properties
│   └── test/
├── .env
├── pom.xml
└── README.md
```

## Ejecucion del Proyecto

1. Clonar el repositorio:
```bash
git clone <url-del-repositorio>
```

2. Navegar al directorio del backend:
```bash
cd productocatalogo.backend
```

3. Iniciar la aplicacion:
```bash
./mvnw spring-boot:run
```

La aplicacion estara disponible en `http://localhost:8000`

## Endpoints de la API

### Productos
- `GET /api/productos` - Obtener todos los productos
- `GET /api/productos/{id}` - Obtener un producto por ID
- `POST /api/productos` - Crear un nuevo producto
- `PUT /api/productos/{id}` - Actualizar un producto existente
- `DELETE /api/productos/{id}` - Eliminar un producto

### Categorias
- `GET /api/categorias` - Obtener todas las categorias
- `GET /api/categorias/{id}` - Obtener una categoria por ID
- `POST /api/categorias` - Crear una nueva categoria
- `PUT /api/categorias/{id}` - Actualizar una categoria existente
- `DELETE /api/categorias/{id}` - Eliminar una categoria

## Seguridad

- Las credenciales de la base de datos y la clave JWT se cargan desde variables de entorno o un archivo `.env`
- Evita dejar contraseñas o secretos escritos directamente en el codigo o en el README
- Se recomienda usar valores distintos en desarrollo y en produccion

## Solucion de Problemas

### Error de Conexion a la Base de Datos
1. Verificar que MySQL este corriendo:
```bash
sudo systemctl status mysql
```

2. Verificar que el usuario tenga los permisos correctos:
```sql
SHOW GRANTS FOR 'tu_usuario'@'localhost';
```

3. Verificar que la base de datos existe:
```sql
SHOW DATABASES LIKE 'producto-catalogo';
```

### Error al Iniciar la Aplicacion
1. Verificar que Java 17 este instalado:
```bash
java -version
```

2. Verificar que Maven este instalado:
```bash
mvn -version
```

3. Limpiar y reconstruir el proyecto:
```bash
./mvnw clean install
```
