import React from 'react';
import config from '../config';
import CatalogPage from './CatalogPage';

const Camisetas = () => (
  <CatalogPage
    apiUrl={config.productCategoryUrl(10)}
    section="mujer"
    eyebrow="Mujer · Camisetas"
    title="Camisetas para mujer"
    subtitle="Siluetas depuradas, tejidos comodos y piezas faciles de combinar para el dia a dia."
    description="Una seleccion pensada para looks ligeros y versatiles, con un lenguaje visual mas limpio y una navegacion mucho mas clara."
    heroClassName="catalog-hero-mujer-camisetas"
  />
);

export default Camisetas;
