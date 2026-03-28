import React from 'react';
import config from '../config';
import CatalogPage from './CatalogPage';

const Zapatos = () => (
  <CatalogPage
    apiUrl={config.productCategoryUrl(12)}
    section="mujer"
    eyebrow="Mujer · Zapatos"
    title="Zapatos para mujer"
    subtitle="Zapatos para completar cada look con comodidad y estilo."
    description="Encuentra pares versátiles para el día a día y para momentos más especiales."
    heroClassName="catalog-hero-mujer-zapatos"
  />
);

export default Zapatos;
