import React from 'react';
import config from '../config';
import CatalogPage from '../components/CatalogPage';

const TodosProductosHombre = () => (
  <CatalogPage
    apiUrl={config.productGenreNameUrl('Hombres')}
    section="hombre"
    eyebrow="Hombre · Todas las categorías"
    title="Toda la selección de hombre"
    subtitle="Recorre toda la colección masculina y encuentra fácilmente lo que te apetece llevar."
    description="Camisetas, pantalones, chaquetas y zapatos reunidos en una sola página para que comprar resulte cómodo y rápido."
    heroClassName="catalog-hero-hombre-todos"
  />
);

export default TodosProductosHombre;
