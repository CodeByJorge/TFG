import React from 'react';
import GenreLandingPage from './components/GenreLandingPage';
import './Mujeres.css';

const Mujeres = () => (
  <GenreLandingPage
    genreName="Mujeres"
    section="mujer"
    eyebrow="Mujer · Seleccion principal"
    title="Coleccion mujer"
    subtitle="Una portada mas elegante para recorrer la coleccion femenina con equilibrio visual y una jerarquia mucho mas clara."
    description="Camisetas, pantalones, vestidos y zapatos conviven ahora en una entrada editorial, ligera y coherente con el nuevo tono de la tienda."
    heroClassName="genre-hero-mujer"
    seeAllPath="/todos-productos-mujer"
    categories={[
      { name: 'Camisetas', path: '/mujeres/camisetas', copy: 'Piezas ligeras y faciles de combinar.' },
      { name: 'Pantalones', path: '/mujeres/pantalones', copy: 'Cortes definidos para looks cotidianos.' },
      { name: 'Vestidos', path: '/mujeres/vestidos', copy: 'Siluetas suaves para dias y ocasiones especiales.' },
      { name: 'Zapatos', path: '/mujeres/zapatos', copy: 'Pares serenos que cierran el estilismo.' },
    ]}
  />
);

export default Mujeres;
