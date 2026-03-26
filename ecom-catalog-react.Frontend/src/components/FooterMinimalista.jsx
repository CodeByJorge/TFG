/**
 * Footer Minimalista - Inspirado en las mejores tiendas de moda 2025
 *
 * Footer limpio y elegante con enlaces esenciales
 */

import React from 'react';
import { Link } from 'react-router-dom';

const FooterMinimalista = () => {
  return (
    <footer className="footer-minimal">
      <div className="footer-container">
        <div className="footer-sections">
          {/* Sobre nosotros */}
          <div className="footer-section">
            <h3 className="footer-heading">F. Minimal</h3>
            <p className="footer-text">
              Moda esencial, sin ruido.
              <br />
              Diseño atemporal para el estilo contemporáneo.
            </p>
          </div>

          {/* Enlaces rápidos */}
          <div className="footer-section">
            <h3 className="footer-heading">Tienda</h3>
            <ul className="footer-links">
              <li><Link to="/mujeres">Mujeres</Link></li>
              <li><Link to="/hombres">Hombres</Link></li>
              <li><Link to="/colecciones">Colecciones</Link></li>
              <li><Link to="/favoritos">Favoritos</Link></li>
            </ul>
          </div>

          {/* Atención al cliente */}
          <div className="footer-section">
            <h3 className="footer-heading">Ayuda</h3>
            <ul className="footer-links">
              <li><Link to="/contacto">Contacto</Link></li>
              <li><Link to="/envios">Envíos</Link></li>
              <li><Link to="/devoluciones">Devoluciones</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-section">
            <h3 className="footer-heading">Mantente al día</h3>
            <p className="footer-text">Novedades y ofertas exclusivas</p>
            <form className="footer-newsletter">
              <input
                type="email"
                placeholder="Tu email"
                className="footer-input"
                required
              />
              <button type="submit" className="footer-btn">Suscribir</button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="footer-divider"></div>

        {/* Bottom */}
        <div className="footer-bottom">
          <p>&copy; 2025 Fashion Minimal. Todos los derechos reservados.</p>
          <div className="footer-bottom-links">
            <Link to="/privacy">Privacidad</Link>
            <Link to="/terms">Términos</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterMinimalista;
