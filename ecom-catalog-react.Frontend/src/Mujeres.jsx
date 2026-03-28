import React from 'react';
import GenreLandingPage from './components/GenreLandingPage';
import './Mujeres.css';

const Mujeres = () => (
  <GenreLandingPage
    genreName="Mujeres"
    section="mujer"
    eyebrow="Mujer · Selección principal"
    title="Colección mujer"
    subtitle="Descubre prendas versátiles para vestir con personalidad en cualquier momento del día."
    description="Camisetas, pantalones, vestidos y zapatos reunidos para que encuentres lo que te apetece de forma rápida y cómoda."
    heroClassName="genre-hero-mujer"
    seeAllPath="/todos-productos-mujer"
    categories={[
      { name: 'Camisetas', path: '/mujeres/camisetas', copy: 'Piezas ligeras y fáciles de combinar.' },
      { name: 'Pantalones', path: '/mujeres/pantalones', copy: 'Cortes definidos para looks de todos los días.' },
      { name: 'Vestidos', path: '/mujeres/vestidos', copy: 'Siluetas suaves para el día y para ocasiones especiales.' },
      { name: 'Zapatos', path: '/mujeres/zapatos', copy: 'Pares que completan el look con un toque elegante.' },
    ]}
  />
);

export default Mujeres;
