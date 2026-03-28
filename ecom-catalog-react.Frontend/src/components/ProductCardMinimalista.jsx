/**
 * ProductCard Minimalista
 *
 * Tarjeta de producto elegante y funcional inspirada en las mejores tiendas de moda.
 */

import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useFavorites } from '../contexts/FavoritesContext';
import { useAuth } from '../contexts/AuthContext';
import '../styles/minimalista.css';
import '../styles/minimalista-components.css';
import defaultImage from '../assets/Hero.jpg';

const ProductCardMinimalista = ({ product }) => {
  const { addToCart } = useCart();
  const { favorites, toggleFavorite } = useFavorites();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const favoriteButtonRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isFavorite = favorites.includes(product.id);
  const collectionPath = product?.categoria?.genero?.nombre === 'Hombres' ? '/hombres' : '/mujeres';
  const imageSrc = product.imagenUrl || defaultImage;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setIsLoading(true);
    try {
      addToCart(product);
    } catch (error) {
      console.error('Error al añadir al carrito:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleFavorite = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    await toggleFavorite(product.id, favoriteButtonRef.current);
  };

  return (
    <div
      className="product-card-link"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="product-card">
        <div className="product-image-container">
          <img
            src={imageSrc}
            alt={product.nombre}
            className="product-image"
            loading="lazy"
          />

          <div className={`product-overlay ${isHovered ? 'visible' : ''}`}>
            <button
              onClick={handleAddToCart}
              disabled={isLoading}
              className="product-action-btn add-to-cart"
              aria-label="Añadir al carrito"
            >
              {isLoading ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v10m0 0v10m0-10h10m-10 0H2"/>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
              )}
            </button>

            <button
              ref={favoriteButtonRef}
              onClick={handleToggleFavorite}
              className={`product-action-btn favorite ${isFavorite ? 'active' : ''}`}
              aria-label={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </button>

            <Link
              to={collectionPath}
              className="product-action-btn view-product"
              aria-label="Ver colección"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 12h16" />
                <path d="M12 4v16" />
              </svg>
            </Link>
          </div>
        </div>

        <div className="product-info">
          <h3 className="product-name">{product.nombre}</h3>

          {product.stock === 0 ? (
            <span className="product-category" style={{ color: '#888', fontSize: '0.68rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Agotado</span>
          ) : product.stock != null && product.stock < 5 ? (
            <span className="product-category" style={{ color: '#b45309', fontSize: '0.68rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Últimas unidades</span>
          ) : product.categoria ? (
            <span className="product-category">
              {product.categoria.nombre}
            </span>
          ) : null}

          <div className="product-price-container">
            <span className="product-price">
              {product.precio}
            </span>
            {product.precioAnterior && (
              <span className="product-price-original">
                {product.precioAnterior}
              </span>
            )}
          </div>

          {product.colores && product.colores.length > 0 && (
            <div className="product-colors">
              {product.colores.slice(0, 3).map((color, index) => (
                <span
                  key={index}
                  className="color-dot"
                  style={{ backgroundColor: color }}
                  aria-label={`Color ${index + 1}`}
                />
              ))}
              {product.colores.length > 3 && (
                <span className="color-more">
                  +{product.colores.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCardMinimalista;
