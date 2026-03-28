import React from 'react';
import config from '../config';
import CatalogPage from '../components/CatalogPage';

const TodosProductosMujer = () => (
  <CatalogPage
    apiUrl={config.productGenreNameUrl('Mujeres')}
    section="mujer"
    eyebrow="Mujer · Todas las categorías"
    title="Toda la selección de mujer"
    subtitle="Descubre toda la colección femenina y encuentra tus prendas favoritas en un solo vistazo."
    description="Camisetas, pantalones, vestidos y zapatos reunidos en una sola página para que comprar sea sencillo y agradable."
    heroClassName="catalog-hero-mujer-todos"
  />
);

export default TodosProductosMujer;
