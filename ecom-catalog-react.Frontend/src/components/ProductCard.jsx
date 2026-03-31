import React, { useRef, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useFavorites } from '../contexts/FavoritesContext';
import { useCart } from '../contexts/CartContext';
import './ProductCard.css';

const formatSizes = (sizes) => {
  if (!Array.isArray(sizes) || sizes.length === 0) {
    return [];
  }

  return sizes
    .map((size) => (typeof size === 'string' ? size : size?.nombre))
    .filter(Boolean)
    .slice(0, 4);
};

const ProductCard = ({
  product,
  showFavoriteButton = true,
}) => {
  const { user, isLoggedIn } = useAuth();
  const { favorites, toggleFavorite } = useFavorites();
  const { addToCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const favoriteButtonRef = useRef(null);

  const isFavoritesPage = location.pathname === '/favoritos';
  const isFavorite = favorites.includes(product.id);
  const sizes = formatSizes(product.tallas);

  const handleFavoriteClick = async (e) => {
    e.preventDefault();
    if (!isLoggedIn || !user?.token) {
      navigate('/login');
      return;
    }

    setIsLoading(true);
    try {
      await toggleFavorite(product.id, favoriteButtonRef.current);
    } catch (error) {
      console.error('Error al actualizar favoritos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn || !user?.token) {
      navigate('/login');
      return;
    }

    try {
      setIsAddingToCart(true);
      addToCart(product);
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 2000);
    } catch (error) {
      console.error('Error al añadir al carrito:', error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <article className="card product-card">
      <Link to={`/producto/${product.id}`} className="image-container">
        <img
          src={product.imagenUrl}
          alt={product.nombre}
          className="card-img-top product-image"
        />
        <div className="product-card-gradient" />
      </Link>

      {showFavoriteButton && (
        <button
          ref={favoriteButtonRef}
          className={`favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={handleFavoriteClick}
          disabled={isLoading}
          aria-label="Guardar en favoritos"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={isFavorite ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      )}

      {isFavoritesPage && (
        <button
          className="cart-btn"
          onClick={handleAddToCart}
          disabled={isAddingToCart}
          title="Agregar al carrito"
          aria-label="Agregar al carrito"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </button>
      )}

      {showNotification && (
        <div className="cart-notification">
          Producto añadido al carrito
        </div>
      )}

      <Link to={`/producto/${product.id}`} className="card-body product-info">
        <div className="product-copy">
          {product.stock === 0 ? (
            <span className="product-kicker" style={{ color: '#888', background: 'rgba(0,0,0,0.05)', padding: '0.15rem 0.5rem', borderRadius: '4px', fontSize: '0.68rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Agotado</span>
          ) : product.stock != null && product.stock < 5 ? (
            <span className="product-kicker" style={{ color: '#b45309', background: 'rgba(180,83,9,0.08)', padding: '0.15rem 0.5rem', borderRadius: '4px', fontSize: '0.68rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Últimas unidades</span>
          ) : (
            <span className="product-kicker">Disponible</span>
          )}
          <h6 className="card-title product-title">{product.nombre}</h6>
          <p className="card-text">{product.descripcion}</p>
        </div>

        <div className="product-footer">
          <strong className="product-price">{product.precio} €</strong>
          <div className="tallas-lista">
            {sizes.length > 0 ? (
              sizes.map((size) => (
                <span key={size} className="size-pill">
                  {size}
                </span>
              ))
            ) : (
              <span className="size-pill size-pill--muted">Sin tallas</span>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
};

export default ProductCard;
