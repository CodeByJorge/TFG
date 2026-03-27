import React from 'react';
import config from '../config';
import CatalogPage from './CatalogPage';

const PantalonesHombre = () => (
  <CatalogPage
    apiUrl={config.productCategoryUrl(14)}
    section="hombre"
    eyebrow="Hombre · Pantalones"
    title="Pantalones para hombre"
    subtitle="Cortes estructurados y materiales equilibrados para un armario limpio, funcional y actual."
    description="Simplificamos la navegacion para que el foco este en la coleccion y no en el ruido visual de la pagina."
    heroClassName="catalog-hero-hombre-pantalones"
  />
);

export default PantalonesHombre;
