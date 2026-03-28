import React from 'react';
import config from '../config';
import CatalogPage from './CatalogPage';

const Camisetas = () => (
  <CatalogPage
    apiUrl={config.productCategoryUrl(10)}
    section="mujer"
    eyebrow="Mujer · Camisetas"
    title="Camisetas para mujer"
    subtitle="Prendas cómodas y fáciles de combinar para acompañarte todos los días."
    description="Encuentra camisetas versátiles para llevar a diario, con colores fáciles y cortes que sientan bien."
    heroClassName="catalog-hero-mujer-camisetas"
  />
);

export default Camisetas;
