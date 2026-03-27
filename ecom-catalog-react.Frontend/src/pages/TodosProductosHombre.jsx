import React from 'react';
import config from '../config';
import CatalogPage from '../components/CatalogPage';

const TodosProductosHombre = () => (
  <CatalogPage
    apiUrl={config.productGenreNameUrl('Hombres')}
    section="hombre"
    eyebrow="Hombre · Todas las categorias"
    title="Toda la seleccion de hombre"
    subtitle="Una vista completa para recorrer la coleccion masculina con calma, claridad y un tono mas editorial."
    description="Explora camisetas, pantalones, chaquetas y zapatos en una sola seleccion pensada para que encontrar una pieza se sienta simple y natural."
    heroClassName="catalog-hero-hombre-todos"
  />
);

export default TodosProductosHombre;
