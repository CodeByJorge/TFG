import React from 'react';
import config from '../config';
import CatalogPage from './CatalogPage';

const Pantalones = () => (
  <CatalogPage
    apiUrl={config.productCategoryUrl(11)}
    section="mujer"
    eyebrow="Mujer · Pantalones"
    title="Pantalones para mujer"
    subtitle="Patrones fluidos, cortes definidos y tonos neutros para elevar el armario diario."
    description="Reordenamos esta categoria para que se sienta mas editorial, mas ligera y coherente con el lenguaje de la landing."
    heroClassName="catalog-hero-mujer-pantalones"
  />
);

export default Pantalones;
