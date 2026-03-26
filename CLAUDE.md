# Proyecto TFG - Tienda de Moda

## Prioridad actual: Rediseño completo UI/UX
Estamos trabajando en un rediseño completo de la interfaz tomando como inspiración las mejores tiendas de moda online con mejores puntuaciones.

### Estado actual del proyecto
- **Frontend**: React en `ecom-catalog-react.Frontend/`
- **Backend**: Node.js/Express en `productocatalogo.backend/`
- **Diseño actual**: Minimalista (ver `LandingMinimalista.jsx`)
- **Base de datos**: MariaDB con Docker

### Contexto importante del rediseño
- Ya se discutió previamente el rediseño completo de la UI/UX
- Se necesita inspiración de tiendas con alta puntuación (Zara, H&M, ASOS, etc.)
- Mantener toda la funcionalidad existente del backend
- El usuario se quedó sin tokens en la conversación anterior

### Próximos pasos (cuando se proporcione la conversación anterior)
1. Analizar los detalles específicos acordados en la conversación anterior
2. Investigar las mejores tiendas de moda online para referencia
3. Implementar los cambios de diseño modernos acordados
4. Mantener la estructura de componentes existente pero actualizando el estilo

### Notas para desarrollo
- El proyecto usa TailwindCSS para estilos
- Los componentes están bien estructurados en `/src/components/`
- Existen contextos para carrito, favoritos y autenticación
- Las rutas están definidas en `App.jsx`
- Los componentes minimalistas están creados en:
  - `/src/styles/minimalista.css`
  - `/src/components/HeaderMinimalista.jsx`
  - `/src/components/ProductCardMinimalista.jsx`
  - `/src/pages/LandingMinimalista.jsx`

### Referencias de diseño
- Inspirado en: Khaite (premio 2024), Mia Online Store, Zara
- Paleta: negro #1a1a1a, grises suaves, blanco limpio
- Tipografía: Inter Tight
- Ver conversación completa en: `/docs/conversacion_anterior_UIUX.md`

### Comandos útiles
```bash
# Iniciar frontend
cd ecom-catalog-react.Frontend && npm run dev

# Iniciar backend
cd productocatalogo.backend && npm start

# Iniciar Docker (base de datos)
docker-compose up -d
```

## IMPORTANTE
Antes de cualquier cambio de UI/UX, esperar a que el usuario proporcione la conversación anterior con los detalles específicos acordados.