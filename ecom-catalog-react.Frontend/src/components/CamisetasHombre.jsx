import React from 'react';
import config from '../config';
import CatalogPage from './CatalogPage';

const CamisetasHombre = () => (
  <CatalogPage
    apiUrl={config.productCategoryUrl(13)}
    section="hombre"
    eyebrow="Hombre · Camisetas"
    title="Camisetas para hombre"
    subtitle="Basicos depurados con una estetica contemporanea y tonos pensados para combinar sin esfuerzo."
    description="Llevamos esta seccion al mismo estandar visual que la home: mas aire, mejor jerarquia y filtros mucho mas claros."
    heroClassName="catalog-hero-hombre-camisetas"
  />
);

export default CamisetasHombre;
