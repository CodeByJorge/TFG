import React from 'react';
import GenreLandingPage from './components/GenreLandingPage';
import './Hombres.css';

const Hombres = () => (
  <GenreLandingPage
    genreName="Hombres"
    section="hombre"
    eyebrow="Hombre · Seleccion principal"
    title="Coleccion hombre"
    subtitle="Una entrada mas limpia para descubrir las piezas clave de la temporada sin perder tiempo en ruido visual."
    description="Desde basicos estructurados hasta capas exteriores y zapatos, esta entrada resume la coleccion masculina con una navegacion mas serena y premium."
    heroClassName="genre-hero-hombre"
    seeAllPath="/todos-productos-hombre"
    categories={[
      { name: 'Camisetas', path: '/hombres/camisetas', copy: 'Basicos depurados para looks diarios.' },
      { name: 'Pantalones', path: '/hombres/pantalones', copy: 'Cortes limpios y materiales equilibrados.' },
      { name: 'Chaquetas', path: '/hombres/chaquetas', copy: 'Capas exteriores con presencia sobria.' },
      { name: 'Zapatos', path: '/hombres/zapatos', copy: 'Pares esenciales para completar el look.' },
    ]}
  />
);

export default Hombres;
