import React from 'react';
import config from '../config';
import CatalogPage from './CatalogPage';

const CamisetasHombre = () => (
  <CatalogPage
    apiUrl={config.productCategoryUrl(13)}
    section="hombre"
    eyebrow="Hombre · Camisetas"
    title="Camisetas para hombre"
    subtitle="Básicos cómodos y fáciles de combinar para cualquier plan del día."
    description="Camisetas para vestir con sencillez, comodidad y un estilo actual."
    heroClassName="catalog-hero-hombre-camisetas"
  />
);

export default CamisetasHombre;
