import React from 'react';
import config from '../config';
import CatalogPage from './CatalogPage';

const Zapatos = () => (
  <CatalogPage
    apiUrl={config.productCategoryUrl(12)}
    section="mujer"
    eyebrow="Mujer · Zapatos"
    title="Zapatos para mujer"
    subtitle="Lineas limpias, acabados sobrios y pares disenados para completar el look sin recargarlo."
    description="Conservamos el catalogo, pero la experiencia pasa a sentirse mas pulida, ligera y alineada con la estetica general de la tienda."
    heroClassName="catalog-hero-mujer-zapatos"
  />
);

export default Zapatos;
