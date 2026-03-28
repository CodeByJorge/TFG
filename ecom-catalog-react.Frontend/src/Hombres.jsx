import React from 'react';
import GenreLandingPage from './components/GenreLandingPage';
import './Hombres.css';

const Hombres = () => (
  <GenreLandingPage
    genreName="Hombres"
    section="hombre"
    eyebrow="Hombre · Selección principal"
    title="Colección hombre"
    subtitle="Descubre prendas clave para vestir bien cada día con una selección clara y fácil de recorrer."
    description="Camisetas, pantalones, chaquetas y zapatos reunidos para que encuentres tu estilo de forma rápida y cómoda."
    heroClassName="genre-hero-hombre"
    seeAllPath="/todos-productos-hombre"
    categories={[
      { name: 'Camisetas', path: '/hombres/camisetas', copy: 'Básicos depurados para looks diarios.' },
      { name: 'Pantalones', path: '/hombres/pantalones', copy: 'Cortes limpios y materiales equilibrados.' },
      { name: 'Chaquetas', path: '/hombres/chaquetas', copy: 'Capas exteriores con presencia sobria.' },
      { name: 'Zapatos', path: '/hombres/zapatos', copy: 'Pares esenciales para completar el look.' },
    ]}
  />
);

export default Hombres;
