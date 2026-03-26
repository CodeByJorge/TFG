/**
 * Hero Minimalista - Inspirado en las mejores tiendas de moda 2025
 *
 * Hero section elegante con alto impacto visual y UX optimizada
 */

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/minimalista.css';

const HeroMinimalista = () => {
  return (
    <section className="hero-minimal">
      {/* Overlay con gradiente sutil para legibilidad */}
      <div className="hero-overlay" />

      {/* Contenido centrado */}
      <div className="hero-content fade-in">
        <h1 className="hero-title">
          Colección Primavera 2025
        </h1>
        <p className="hero-subtitle">
          Diseño atemporal, estilo contemporáneo
        </p>

        {/* CTAs minimalistas */}
        <div className="hero-actions">
          <Link to="/mujeres" className="btn-primary">
            Mujeres
          </Link>
          <Link to="/hombres" className="btn-secondary">
            Hombres
          </Link>
        </div>

        {/* Indicador de scroll sutil */}
        <div className="scroll-indicator">
          <span>Descubrir</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default HeroMinimalista;