import React from 'react';
import config from '../config';
import CatalogPage from './CatalogPage';

const ZapatosHombre = () => (
  <CatalogPage
    apiUrl={config.productCategoryUrl(16)}
    section="hombre"
    eyebrow="Hombre · Zapatos"
    title="Zapatos para hombre"
    subtitle="Piezas esenciales con lineas firmes y una paleta mas sobria para completar looks cotidianos o formales."
    description="Homogeneizamos esta vista con el resto del sitio para que el catalogo se sienta parte de una misma marca."
    heroClassName="catalog-hero-hombre-zapatos"
  />
);

export default ZapatosHombre;
