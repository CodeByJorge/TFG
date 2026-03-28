import React from 'react';
import config from '../config';
import CatalogPage from './CatalogPage';

const ZapatosHombre = () => (
  <CatalogPage
    apiUrl={config.productCategoryUrl(16)}
    section="hombre"
    eyebrow="Hombre · Zapatos"
    title="Zapatos para hombre"
    subtitle="Zapatos versátiles para completar tanto looks diarios como opciones más formales."
    description="Encuentra pares cómodos y fáciles de llevar para acompañarte a diario."
    heroClassName="catalog-hero-hombre-zapatos"
  />
);

export default ZapatosHombre;
