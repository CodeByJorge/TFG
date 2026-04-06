/**
 * ProductCard Minimalista
 *
 * Tarjeta de producto elegante y funcional inspirada en las mejores tiendas de moda.
 */

import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFavorites } from '../contexts/FavoritesContext';
import { useAuth } from '../contexts/AuthContext';
import defaultImage from '../assets/Hero.jpg';

const ProductCardMinimalista = ({ product }) => {
  const { favorites, toggleFavorite } = useFavorites();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const favoriteButtonRef = useRef(null);

  const isFavorite = favorites.includes(product.id);
  const imageSrc = product.imagenUrl || defaultImage;

  const handleToggleFavorite = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    await toggleFavorite(product.id, favoriteButtonRef.current);
  };

  const coloresArray = typeof product.colores === 'string'
    ? product.colores.split(',').map(c => c.trim()).filter(Boolean)
    : Array.isArray(product.colores) ? product.colores : [];

  return (
    <div className="pcm-card">
      <Link to={`/producto/${product.id}`} className="pcm-card-link">
        <div className="pcm-image-wrap">
          <img
            src={imageSrc}
            alt={product.nombre}
            className="pcm-image"
            loading="lazy"
          />
        </div>

        <div className="pcm-info">
          <h3 className="pcm-name">{product.nombre}</h3>

          {product.stock === 0 ? (
            <span className="pcm-category" style={{ color: '#888' }}>Agotado</span>
          ) : product.stock != null && product.stock < 5 ? (
            <span className="pcm-category" style={{ color: '#b45309' }}>Últimas unidades</span>
          ) : product.categoria ? (
            <span className="pcm-category">{product.categoria.nombre}</span>
          ) : null}

          <div className="pcm-price-row">
            <span className="pcm-price">{product.precio} €</span>
            {product.precioAnterior && (
              <span className="pcm-price-old">{product.precioAnterior} €</span>
            )}
          </div>

          {coloresArray.length > 0 && (
            <div className="pcm-colors">
              {coloresArray.slice(0, 3).map((color, index) => (
                <span
                  key={index}
                  className="pcm-color-dot"
                  style={{ backgroundColor: color }}
                />
              ))}
              {coloresArray.length > 3 && (
                <span className="pcm-color-more">+{coloresArray.length - 3}</span>
              )}
            </div>
          )}
        </div>
      </Link>

      <button
        ref={favoriteButtonRef}
        onClick={handleToggleFavorite}
        className={`pcm-fav-btn ${isFavorite ? 'pcm-fav-active' : ''}`}
        aria-label={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill={isFavorite ? '#EF4444' : 'none'} stroke={isFavorite ? '#EF4444' : '#fff'} strokeWidth="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      </button>
    </div>
  );
};

export default ProductCardMinimalista;
