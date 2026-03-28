import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useFavorites } from '../contexts/FavoritesContext';
import SearchPreviewPortal from './SearchPreviewPortal';
import config from '../config';
import '../styles/minimalista.css';
import '../styles/minimalista-components.css';

const HeaderMinimalista = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const { cartItemsCount = 0 } = useCart();
  const { favoritesCount = 0 } = useFavorites();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const mobileMenuRef = useRef(null);
  const searchPanelRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
      if (searchPanelRef.current && !searchPanelRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(async () => {
      setIsLoading(true);
      try {
        const response = await fetch(config.productSearchUrl(searchTerm));
        if (!response.ok) {
          throw new Error('Busqueda no disponible');
        }
        setSearchResults(await response.json());
      } catch (error) {
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 250);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [searchTerm]);

  useEffect(() => {
    document.body.style.overflow = isSearchOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isSearchOpen]);

  const goToSearch = () => {
    if (!searchTerm.trim()) return;
    setIsSearchOpen(false);
    navigate(`/buscar?query=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <header className="fashion-header">
      <div className="fashion-header-inner">
        <button
          className="fashion-menu-button"
          type="button"
          onClick={() => setIsMenuOpen((value) => !value)}
          aria-label="Abrir menu"
        >
          <span />
          <span />
        </button>

        <nav className={`fashion-nav ${isMenuOpen ? 'is-open' : ''}`} ref={mobileMenuRef}>
          <Link to="/mujeres" className="fashion-nav-link" onClick={() => setIsMenuOpen(false)}>Mujeres</Link>
          <Link to="/hombres" className="fashion-nav-link" onClick={() => setIsMenuOpen(false)}>Hombres</Link>
          <Link to="/colecciones" className="fashion-nav-link" onClick={() => setIsMenuOpen(false)}>Colecciones</Link>
          <Link to="/faq" className="fashion-nav-link" onClick={() => setIsMenuOpen(false)}>Ayuda</Link>
        </nav>

        <Link to="/" className="fashion-brand" aria-label="Volver al inicio">
          F. Minimal
        </Link>

        <div className="fashion-actions">
          <button
            className="fashion-pill-button fashion-search-button"
            type="button"
            onClick={() => setIsSearchOpen((value) => !value)}
            aria-label="Buscar"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <span className="fashion-pill-text">Buscar</span>
          </button>

          <Link to="/favoritos" className="fashion-pill-button fashion-favorites-button" aria-label="Favoritos">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21.2l8.8-8.8a5.5 5.5 0 0 0 0-7.8Z" />
            </svg>
            <span className="fashion-pill-text">Favoritos</span>
            {favoritesCount > 0 && <span className="fashion-badge">{favoritesCount}</span>}
          </Link>

          {location.pathname !== '/' && (
            <Link to="/carrito" className="fashion-pill-button fashion-cart-button" aria-label="Carrito">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M6 7h12l-1 12H7L6 7Z" />
                <path d="M9 7a3 3 0 0 1 6 0" />
              </svg>
              <span className="fashion-pill-text">Carrito</span>
              {cartItemsCount > 0 && <span className="fashion-badge">{cartItemsCount}</span>}
            </Link>
          )}

          {user ? (
            <div className="fashion-user">
              <button className="fashion-pill-button fashion-user-button" type="button">
                {user.nombre}
              </button>
              <Link to="/mi-cuenta" className="fashion-pill-button" style={{ fontSize: '0.8rem' }}>Mi cuenta</Link>
              {user.rol === 'ADMIN' && (
                <Link to="/admin" className="fashion-pill-button fashion-admin-link" aria-label="Panel de administración">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </Link>
              )}
              <button className="fashion-pill-button fashion-logout" type="button" onClick={logout}>
                Salir
              </button>
            </div>
          ) : (
            <Link to="/login" className="fashion-pill-button fashion-login-link">Entrar</Link>
          )}
        </div>
      </div>

      {isSearchOpen && (
        <SearchPreviewPortal>
          <div className="fashion-search-panel" ref={searchPanelRef}>
            <div className="fashion-search-box">
              <input
                className="fashion-search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar prendas, colecciones, estilos..."
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    goToSearch();
                  }
                }}
              />
              <button className="fashion-search-submit" type="button" onClick={goToSearch}>Ir</button>
              <button
                className="fashion-search-close"
                type="button"
                onClick={() => setIsSearchOpen(false)}
                aria-label="Cerrar busqueda"
              >
                x
              </button>
            </div>

            {isLoading ? (
              <div className="fashion-search-state">Buscando...</div>
            ) : searchResults.length > 0 ? (
              <div className="fashion-search-results">
                {searchResults.slice(0, 4).map((product) => (
                  <button
                    key={product.id}
                    className="fashion-search-result"
                    onClick={() => {
                      setIsSearchOpen(false);
                      navigate(`/buscar?query=${encodeURIComponent(searchTerm)}`);
                    }}
                  >
                    <img src={product.imagenUrl} alt={product.nombre} />
                    <div>
                      <strong>{product.nombre}</strong>
                      <span>{product.precio} EUR</span>
                    </div>
                  </button>
                ))}
              </div>
            ) : searchTerm.trim() ? (
              <div className="fashion-search-state">No se encontraron resultados.</div>
            ) : null}
          </div>
        </SearchPreviewPortal>
      )}
    </header>
  );
};

export default HeaderMinimalista;
