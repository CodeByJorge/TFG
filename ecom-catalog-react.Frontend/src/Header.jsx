/**
 * Componente Header
 * 
 * Este componente representa la barra de navegación superior de la aplicación.
 * Incluye el menú de navegación, el logo y los botones de acción (búsqueda, carrito y login).
 * 
 * @component
 */
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from './contexts/CartContext';
import './Header.css';
import './styles/minimalista.css';
import SearchPreviewPortal from './components/SearchPreviewPortal';
import config from './config';
import { useAuth } from './contexts/AuthContext';
import { useFavorites } from './contexts/FavoritesContext';

const CartPreview = ({ cart = [], onViewCart }) => {
  const total = cart.reduce((sum, item) => sum + item.precio * item.quantity, 0);
  return (
    <div className="cart-preview">
      <h4>Carrito</h4>
      {cart.length === 0 ? (
        <div className="cart-preview-empty">Tu carrito está vacío</div>
      ) : (
        <>
          <ul className="cart-preview-list">
            {cart.slice(0, 2).map(item => (
              <li key={item.id} className="cart-preview-item">
                <img src={item.imagenUrl} alt={item.nombre} className="cart-preview-img" />
                <div className="cart-preview-info">
                  <span className="cart-preview-name">{item.nombre}</span>
                  <span className="cart-preview-qty">x{item.quantity}</span>
                  <span className="cart-preview-price">{item.precio}€</span>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-preview-total">
            <span>Total:</span>
            <span>{total.toFixed(2)}€</span>
          </div>
          <button className="cart-preview-btn" onClick={onViewCart}>Ver carrito</button>
        </>
      )}
    </div>
  );
};

const Header = ({ onCartClick }) => {
  const { cart = [], cartItemsCount = 0 } = useCart();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHombresMenuOpen, setIsHombresMenuOpen] = useState(false);
  const [isMujeresMenuOpen, setIsMujeresMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchPanelRef = useRef(null);
  const searchTimeoutRef = useRef(null);
  const { user, logout } = useAuth();
  const [showCartPreview, setShowCartPreview] = useState(false);
  const { favoritesCount, animatingProduct, setAnimatingProduct } = useFavorites();
  const [heartAnimation, setHeartAnimation] = useState(null);

  // Referencias para los contenedores de los menús
  const hombresMenuRef = useRef(null);
  const mujeresMenuRef = useRef(null);

  // Efecto para manejar el cierre del menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (hombresMenuRef.current && !hombresMenuRef.current.contains(event.target)) {
        setIsHombresMenuOpen(false);
      }
      if (mujeresMenuRef.current && !mujeresMenuRef.current.contains(event.target)) {
        setIsMujeresMenuOpen(false);
      }
      if (searchPanelRef.current && !searchPanelRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Efecto para la búsqueda en tiempo real
  useEffect(() => {
    if (searchTerm.trim()) {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }

      searchTimeoutRef.current = setTimeout(async () => {
        setIsLoading(true);
        try {
          const response = await fetch(`${config.PRODUCTS_URL}/buscar?query=${encodeURIComponent(searchTerm)}`);
          if (!response.ok) {
            throw new Error('Error en la búsqueda');
          }
          const products = await response.json();
          setSearchResults(products);
        } catch (error) {
          console.error('Error:', error);
          setSearchResults([]);
        } finally {
          setIsLoading(false);
        }
      }, 300);
    } else {
      setSearchResults([]);
    }

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchTerm]);

  // Bloquear scroll del body cuando la búsqueda está abierta
  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isSearchOpen]);

  useEffect(() => {
    if (animatingProduct) {
      const productRect = animatingProduct.element.getBoundingClientRect();
      const heartIcon = document.querySelector('.nav-right .icon-btn[aria-label="Favoritos"]');
      const heartRect = heartIcon.getBoundingClientRect();

      const animation = document.createElement('div');
      animation.className = 'flying-heart';
      animation.style.cssText = `
        position: fixed;
        z-index: 9999;
        left: ${productRect.left + productRect.width/2}px;
        top: ${productRect.top + productRect.height/2}px;
        transform: translate(-50%, -50%);
      `;

      animation.innerHTML = `
        <svg width="22" height="22" fill="currentColor" stroke="none" viewBox="0 0 24 24">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      `;

      document.body.appendChild(animation);

      requestAnimationFrame(() => {
        animation.style.transition = 'all 1.2s cubic-bezier(0.075, 0.82, 0.165, 1)';
        animation.style.left = `${heartRect.left + heartRect.width/2}px`;
        animation.style.top = `${heartRect.top + heartRect.height/2}px`;
        animation.style.transform = 'translate(-50%, -50%) scale(0.5)';
        animation.style.opacity = '0';
      });

      setTimeout(() => {
        document.body.removeChild(animation);
        setAnimatingProduct(null);
      }, 6500);

      setHeartAnimation(animation);
    }

    return () => {
      if (heartAnimation) {
        heartAnimation.remove();
      }
    };
  }, [animatingProduct]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setIsSearchOpen(false);
      navigate(`/buscar/${encodeURIComponent(searchTerm)}`, { state: { products: searchResults, searchTerm } });
    }
  };

  return (
    <header className="main-header">
      {/* Botón de menú hamburguesa para móviles */}
      <button 
        className="menu-toggle" 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>

      {/* Menú de navegación izquierdo */}
      <nav className={`nav-left ${isMenuOpen ? 'nav-open' : ''}`}>
        <ul>
          <li>
            <Link to="/" className="nav-link home-link" onClick={() => setIsMenuOpen(false)}>Inicio</Link>
          </li>
          <li 
            className="dropdown-container" 
            ref={mujeresMenuRef}
            onMouseEnter={() => setIsMujeresMenuOpen(true)}
            onMouseLeave={() => setIsMujeresMenuOpen(false)}
          >
            <Link 
              to="/mujeres"
              className="nav-link dropdown-trigger"
              onClick={() => setIsMujeresMenuOpen(!isMujeresMenuOpen)}
            >
              Mujeres
              <svg 
                className={`dropdown-arrow ${isMujeresMenuOpen ? 'open' : ''}`}
                width="12" 
                height="12" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </Link>
            <div className={`dropdown-menu ${isMujeresMenuOpen ? 'show' : ''}`}>
              <Link to="/mujeres/camisetas" className="dropdown-item">Camisetas</Link>
              <Link to="/mujeres/pantalones" className="dropdown-item">Pantalones</Link>
              <Link to="/mujeres/vestidos" className="dropdown-item">Vestidos</Link>
              <Link to="/mujeres/zapatos" className="dropdown-item">Zapatos</Link>
            </div>
          </li>
          <li 
            className="dropdown-container" 
            ref={hombresMenuRef}
            onMouseEnter={() => setIsHombresMenuOpen(true)}
            onMouseLeave={() => setIsHombresMenuOpen(false)}
          >
            <Link 
              to="/hombres"
              className="nav-link dropdown-trigger"
              onClick={() => setIsHombresMenuOpen(!isHombresMenuOpen)}
            >
              Hombres
              <svg 
                className={`dropdown-arrow ${isHombresMenuOpen ? 'open' : ''}`}
                width="12" 
                height="12" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </Link>
            <div className={`dropdown-menu ${isHombresMenuOpen ? 'show' : ''}`}>
              <Link to="/hombres/camisetas" className="dropdown-item">Camisetas</Link>
              <Link to="/hombres/pantalones" className="dropdown-item">Pantalones</Link>
              <Link to="/hombres/chaquetas" className="dropdown-item">Chaquetas</Link>
              <Link to="/hombres/zapatos" className="dropdown-item">Zapatos</Link>
            </div>
          </li>
          <li>
            <Link to="/colecciones" className="nav-link" onClick={() => setIsMenuOpen(false)}>Colecciones</Link>
          </li>
        </ul>
      </nav>

      {/* Logo central */}
      <div className="logo-center">
        <Link to="/" className="logo-link">
          <span className="logo-text">FASHION</span>
        </Link>
      </div>

      {/* Menú de acciones derechas */}
      <div className="nav-right">
        {/* Botón de búsqueda */}
        <button 
          className="icon-btn" 
          aria-label="Buscar"
          onClick={() => setIsSearchOpen(!isSearchOpen)}
        >
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
        </button>

        {/* Botón de favoritos */}
        <Link to="/favoritos" className="icon-btn" aria-label="Favoritos">
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
          {favoritesCount > 0 && (
            <span className="favorites-count">{favoritesCount}</span>
          )}
        </Link>

        {/* Botón del carrito con preview al hover */}
        <div
          className="cart-preview-container"
          onMouseEnter={() => setShowCartPreview(true)}
          onMouseLeave={() => setShowCartPreview(false)}
          style={{ position: 'relative', display: 'inline-block' }}
        >
          <button
            className="icon-btn cart-link"
            aria-label="Carrito"
            onClick={() => navigate('/carrito')}
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {cartItemsCount > 0 && (
              <span className="cart-count">{cartItemsCount}</span>
            )}
          </button>
          {showCartPreview && (
            <CartPreview cart={cart} onViewCart={() => { setShowCartPreview(false); navigate('/carrito'); }} />
          )}
        </div>

        {/* Botón de inicio de sesión o nombre del usuario */}
        {user ? (
          <div className="user-menu">
            <button className="user-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {user.nombre}
            </button>
            {isMenuOpen && (
              <div className="user-dropdown">
                <Link to="/perfil" className="dropdown-item">Perfil</Link>
                {user.rol === 'ADMIN' && (
                  <Link to="/admin" className="dropdown-item">Panel de Administración</Link>
                )}
               
                <button className="dropdown-item" onClick={logout}>Cerrar sesión</button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="login-btn">Iniciar sesión</Link>
        )}
      </div>

      {/* Panel de búsqueda */}
      {isSearchOpen && (
        <SearchPreviewPortal>
          <div className="search-results-preview" ref={searchPanelRef}>
            <form className="search-form" onSubmit={handleSearch} autoComplete="off">
              <div className="search-input-container">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                  autoFocus
                />
                <button 
                  className="close-search-button" 
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  aria-label="Cerrar búsqueda"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              {/* Resultados de búsqueda en tiempo real */}
              {isLoading ? (
                <div className="search-results-loading">
                  <p>Buscando...</p>
                </div>
              ) : searchResults.length > 0 ? (
                <>
                  <div className="search-results-header" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2vw 0.5rem 2vw'}}>
                    <h4 style={{margin: 0, fontSize: '0.98rem', fontWeight: 500, color: '#333'}}>{searchResults.length} resultado{searchResults.length !== 1 ? 's' : ''}</h4>
                    <button
                      className="search-view-all-btn"
                      style={{background: 'none', border: 'none', color: '#1d1a1a', fontWeight: 500, cursor: 'pointer', fontSize: '0.95rem', padding: 0, marginLeft: '1rem'}}
                      onClick={() => {
                        setIsSearchOpen(false);
                        navigate(`/buscar?query=${encodeURIComponent(searchTerm)}`);
                      }}
                    >
                      Ver todo
                    </button>
                  </div>
                  <div className="search-results-list">
                    {searchResults.slice(0, 4).map((product) => (
                      <div 
                        key={product.id} 
                        className="search-result-item"
                        onClick={() => {
                          setIsSearchOpen(false);
                          navigate(`/buscar/${encodeURIComponent(searchTerm)}`, { 
                            state: { products: searchResults, searchTerm } 
                          });
                        }}
                      >
                        <img src={product.imagenUrl} alt={product.nombre} className="search-result-image" />
                        <div className="search-result-info">
                          <h5>{product.nombre}</h5>
                          <p>{product.categoria?.nombre}</p>
                          <p className="search-result-price">{product.precio}€</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : searchTerm.trim() ? (
                <div className="search-results-empty">
                  <p>No se encontraron productos para "{searchTerm}"</p>
                </div>
              ) : null}
            </form>
          </div>
        </SearchPreviewPortal>
      )}
    </header>
  );
};

export default Header; 