import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import config from '../config';
import ProductCard from './ProductCard';
import './GenreLandingPage.css';

const GenreLandingPage = ({
  genreName,
  section,
  eyebrow,
  title,
  subtitle,
  description,
  heroClassName,
  categories,
  seeAllPath,
}) => {
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(config.productGenreNameUrl(genreName));
        if (!response.ok) {
          throw new Error('No se pudo cargar la coleccion.');
        }
        const data = await response.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message || 'No se pudo cargar la coleccion.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [genreName]);

  useEffect(() => {
    const fetchFavoritos = async () => {
      if (!isLoggedIn || !user?.token) return;

      try {
        const response = await axios.get(config.FAVORITES_URL, {
          headers: {
            Authorization: `Bearer ${user.token}`,
            'Content-Type': 'application/json',
          },
        });
        setFavoritos(response.data.map((fav) => fav.producto.id));
      } catch (favError) {
        console.error('Error al cargar favoritos:', favError);
      }
    };

    fetchFavoritos();
  }, [isLoggedIn, user]);

  const handleFavoriteToggle = (productId) => {
    setFavoritos((prevFavoritos) => (
      prevFavoritos.includes(productId)
        ? prevFavoritos.filter((id) => id !== productId)
        : [...prevFavoritos, productId]
    ));
  };

  const featuredProducts = products.slice(0, 4);

  return (
    <div className={`genre-landing genre-landing--${section}`}>
      <section className={`genre-hero ${heroClassName}`}>
        <div className="genre-hero-overlay" />
        <div className="genre-hero-content">
          <span className="genre-hero-eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          <p>{subtitle}</p>
          <div className="genre-hero-actions">
            <button type="button" className="genre-primary-button" onClick={() => navigate(seeAllPath)}>
              Ver toda la seleccion
            </button>
          </div>
        </div>
      </section>

      <div className="genre-shell">
        <section className="genre-intro-card">
          <div>
            <span className="genre-label">Coleccion curada</span>
            <h2>{title}</h2>
          </div>
          <p>{description}</p>
        </section>

        <section className="genre-category-section">
          <div className="genre-section-head">
            <div>
              <span className="genre-label">Categorias</span>
              <h3>Explora por silueta</h3>
            </div>
            <Link to={seeAllPath} className="genre-secondary-link">
              Ver catalogo completo
            </Link>
          </div>
          <div className="genre-category-grid">
            {categories.map((category) => (
              <Link key={category.path} to={category.path} className="genre-category-card">
                <span className="genre-category-name">{category.name}</span>
                <span className="genre-category-copy">{category.copy}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="genre-products-section">
          <div className="genre-section-head">
            <div>
              <span className="genre-label">Seleccion destacada</span>
              <h3>Piezas para empezar</h3>
            </div>
            {!loading && !error && (
              <strong className="genre-products-count">
                {products.length} {products.length === 1 ? 'producto' : 'productos'}
              </strong>
            )}
          </div>

          {loading ? (
            <div className="genre-state">Cargando seleccion...</div>
          ) : error ? (
            <div className="genre-state genre-state--error">{error}</div>
          ) : (
            <div className="genre-products-grid">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isFavorite={favoritos.includes(product.id)}
                  onFavoriteToggle={handleFavoriteToggle}
                  showFavoriteButton={true}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default GenreLandingPage;
