import React from 'react';
import config from '../config';
import CatalogPage from './CatalogPage';

const Vestidos = () => (
  <CatalogPage
    apiUrl={config.productCategoryUrl(9)}
    section="mujer"
    eyebrow="Mujer · Vestidos"
    title="Vestidos para mujer"
    subtitle="Vestidos con una caída natural y un estilo fácil de llevar en cualquier ocasión."
    description="Una selección de vestidos para vestir cómoda, femenina y con un punto elegante."
    heroClassName="catalog-hero-mujer-vestidos"
  />
);

export default Vestidos;
