import React from 'react';
import config from '../config';
import CatalogPage from './CatalogPage';

const ChaquetasHombre = () => (
  <CatalogPage
    apiUrl={config.productCategoryUrl(15)}
    section="hombre"
    eyebrow="Hombre · Chaquetas"
    title="Chaquetas para hombre"
    subtitle="Chaquetas para completar el look con abrigo, estilo y un acabado actual."
    description="Descubre chaquetas pensadas para entretiempo y para los días en los que apetece ir un poco más arreglado."
    heroClassName="catalog-hero-hombre-chaquetas"
  />
);

export default ChaquetasHombre;
