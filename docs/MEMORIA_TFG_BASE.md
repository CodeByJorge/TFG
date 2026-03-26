# Memoria TFG - Base de redaccion

## 1. Descripcion general

Este proyecto implementa una plataforma de comercio electronico orientada al catalogo de moda. La solucion se divide en dos aplicaciones desacopladas: un frontend en React para la experiencia de usuario y un backend en Spring Boot para logica de negocio, autenticacion y acceso a datos.

Objetivo principal del TFG:
- construir una arquitectura web moderna y mantenible;
- ofrecer una experiencia de compra clara y responsive;
- aplicar buenas practicas de seguridad y organizacion del codigo.

## 2. Arquitectura

Arquitectura de alto nivel:
- **Frontend (`ecom-catalog-react.Frontend`)**: SPA en React + Vite con enrutado, estados de carrito/favoritos/autenticacion y vistas por seccion.
- **Backend (`productocatalogo.backend`)**: API REST en Spring Boot, seguridad JWT, persistencia con JPA sobre MySQL.
- **Base de datos**: MySQL 8 para productos, categorias, usuarios y relaciones.
- **Despliegue local**: soporte con Docker Compose para levantar servicios de forma unificada.

Flujo principal:
1. El usuario navega por la SPA y realiza acciones (buscar, filtrar, login, favoritos, carrito).
2. El frontend consume endpoints REST del backend.
3. El backend valida seguridad y reglas de negocio, y persiste cambios en MySQL.
4. La respuesta se renderiza de forma reactiva en el frontend.

## 3. Estructura de frontend

Puntos destacados:
- `src/App.jsx` centraliza rutas y layouts.
- Contextos (`AuthContext`, `CartContext`, `FavoritesContext`) para estado global.
- Landing minimalista en `src/pages/LandingMinimalista.jsx`.
- Componentes reutilizables en `src/components`.

Decisiones relevantes:
- Vite para mejorar tiempos de desarrollo y build.
- React Router para navegacion declarativa.
- Separacion por dominio funcional (auth, admin, catalogo, layout).

## 4. Estructura de backend

Puntos destacados:
- Controladores REST para productos/categorias/autenticacion.
- Capa de servicios para reglas de negocio.
- Repositorios JPA para persistencia.
- Seguridad con JWT para endpoints protegidos.

Decisiones relevantes:
- Spring Boot por productividad y ecosistema.
- JPA para reducir codigo repetitivo en acceso a datos.
- Variables de entorno para secretos y configuracion.

## 5. Diseno y UX (landing minimalista)

Objetivos de diseno:
- reducir ruido visual;
- reforzar jerarquia de contenido;
- facilitar acceso rapido a `Mujeres`, `Hombres` y `Colecciones`;
- destacar productos sin saturar la portada.

Cambios aplicados:
- hero con CTA multiples;
- bloque de destacados usando `ProductCardMinimalista`;
- seccion de acceso por categorias;
- CTA intermedio a colecciones y busqueda;
- mensajes orientados al contexto academico del TFG.

## 6. Coherencia visual

Para unificar identidad entre cabecera clasica y minimalista se adopta:
- tipografia compartida (familia principal/sans);
- paleta neutra basada en variables CSS;
- estilo de logo y hover mas sobrio;
- transicion progresiva para evitar regresiones en secciones legacy.

## 7. Capturas recomendadas para la memoria

Incluye al menos:
1. Home con landing minimalista (hero + CTA).
2. Seccion de destacados con `ProductCardMinimalista`.
3. Navegacion por categorias (`/mujeres`, `/hombres`, `/colecciones`).
4. Flujo de login y acceso a favoritos/carrito.
5. Vista de administracion (si aplica).
6. Esquema de arquitectura (frontend/backend/db).

## 8. Pruebas y validacion

Pruebas funcionales minimas:
- rutas principales cargan sin error;
- busqueda devuelve resultados y estado vacio;
- carrito/favoritos actualizan contadores;
- autenticacion habilita contenido protegido;
- landing responsive (mobile/tablet/desktop).

Recomendacion:
- documentar en tabla: caso, pasos, resultado esperado, resultado obtenido.

## 9. Despliegue y operacion

Opciones:
- ejecucion manual por separado (frontend + backend + mysql);
- ejecucion con Docker Compose para entorno integrado.

Se recomienda incluir:
- variables necesarias por entorno;
- puertos y dependencias;
- procedimiento de arranque y parada;
- consideraciones de seguridad para produccion.

## 10. Trabajo futuro

Lineas de mejora para continuidad:
- tests automatizados E2E;
- metricas de rendimiento (Core Web Vitals);
- observabilidad backend (logs estructurados/trazas);
- checkout completo con pasarela de pago;
- panel analitico de comportamiento de usuarios.
