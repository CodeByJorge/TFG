import React from 'react';
import config from '../config';
import CatalogPage from './CatalogPage';

const Pantalones = () => (
  <CatalogPage
    apiUrl={config.productCategoryUrl(11)}
    section="mujer"
    eyebrow="Mujer · Pantalones"
    title="Pantalones para mujer"
    subtitle="Pantalones cómodos y versátiles para combinar a diario con facilidad."
    description="Descubre pantalones pensados para el día a día, con cortes favorecedores y tejidos agradables."
    heroClassName="catalog-hero-mujer-pantalones"
  />
);

export default Pantalones;
