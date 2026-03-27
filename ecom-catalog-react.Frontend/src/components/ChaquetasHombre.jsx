import React from 'react';
import config from '../config';
import CatalogPage from './CatalogPage';

const ChaquetasHombre = () => (
  <CatalogPage
    apiUrl={config.productCategoryUrl(15)}
    section="hombre"
    eyebrow="Hombre · Chaquetas"
    title="Chaquetas para hombre"
    subtitle="Capas exteriores con caracter sereno, textura discreta y presencia sobria para cualquier temporada."
    description="Esta seccion gana profundidad visual con una base mas premium y un sistema de filtrado alineado con el resto del catalogo."
    heroClassName="catalog-hero-hombre-chaquetas"
  />
);

export default ChaquetasHombre;
