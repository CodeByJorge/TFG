# Backend/API - Entorno, pruebas y despliegue

## 1. Entorno local

Requisitos:
- Java 17+
- Maven
- MySQL 8+

Configuracion:
1. En `productocatalogo.backend`, copia `.env.example` a `.env.local`.
2. Define credenciales reales de base de datos y `JWT_SECRET`.
3. Verifica que la BD `producto-catalogo` exista (o restaura backup SQL).

Variables clave:
- `DB_URL`
- `DB_USERNAME`
- `DB_PASSWORD`
- `JWT_SECRET`

## 2. Arranque del backend

Desde `productocatalogo.backend`:

```bash
./mvnw spring-boot:run
```

El backend queda en `http://localhost:8000`.

## 3. Integracion frontend-backend

En frontend, revisar variable:
- `VITE_API_BASE_URL`

Debe apuntar al backend local o al host de despliegue segun entorno.

## 4. Pruebas recomendadas de API

Checklist funcional:
- `GET /api/productos` devuelve lista.
- CRUD de productos protegido cuando corresponda.
- Login devuelve JWT valido.
- Endpoints protegidos rechazan peticiones sin token.
- Validaciones de payload responden errores controlados.

Checklist tecnico:
- codigos HTTP coherentes;
- mensajes de error uniformes;
- logs legibles sin exponer secretos.

## 5. Estrategia de despliegue

### Opcion A: Docker Compose
- Arrancar stack completo con script de raiz:
  - `.\start-docker.ps1`
- Verificar servicios levantados:
  - frontend;
  - backend;
  - base de datos.

### Opcion B: Servicios separados
- Backend en servidor Java.
- MySQL gestionado.
- Frontend estatico (build Vite) servido por Nginx u otro.

## 6. Seguridad minima para produccion

- No versionar secretos reales.
- `JWT_SECRET` robusta y distinta por entorno.
- CORS restringido a dominios permitidos.
- HTTPS obligatorio en despliegue publico.
- Rotacion de credenciales y backups periodicos.

## 7. Evidencias para la memoria TFG

Incluye en anexos:
- capturas de variables de entorno (ocultando secretos);
- resultado de pruebas de endpoints (Postman/Thunder Client/curl);
- capturas de contenedores/servicios activos;
- tabla de incidencias encontradas y resolucion.
