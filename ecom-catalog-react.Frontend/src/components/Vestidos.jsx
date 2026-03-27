import React from 'react';
import config from '../config';
import CatalogPage from './CatalogPage';

const Vestidos = () => (
  <CatalogPage
    apiUrl={config.productCategoryUrl(9)}
    section="mujer"
    eyebrow="Mujer · Vestidos"
    title="Vestidos para mujer"
    subtitle="Disenos serenos, con caida suave y presencia elegante para ocasiones cotidianas o especiales."
    description="Esta vista ahora prioriza la calma visual, la legibilidad y una exploracion mas intuitiva de la coleccion."
    heroClassName="catalog-hero-mujer-vestidos"
  />
);

export default Vestidos;
