import React from 'react';
import config from '../config';
import CatalogPage from './CatalogPage';

const PantalonesHombre = () => (
  <CatalogPage
    apiUrl={config.productCategoryUrl(14)}
    section="hombre"
    eyebrow="Hombre · Pantalones"
    title="Pantalones para hombre"
    subtitle="Pantalones pensados para vestir bien a diario con un ajuste cómodo y actual."
    description="Modelos versátiles para combinar con facilidad y crear looks para cualquier momento."
    heroClassName="catalog-hero-hombre-pantalones"
  />
);

export default PantalonesHombre;
