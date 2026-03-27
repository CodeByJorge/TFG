import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import config from '../config';
import ProductCard from './ProductCard';
import CategoryMenu from './CategoryMenu';
import FilterPanel from './FilterPanel';
import './CatalogPage.css';

const DEFAULT_FILTERS = {
  priceRange: { min: 0, max: 250 },
  sortBy: 'featured',
  size: '',
  color: '',
};

const normalizeText = (value = '') => String(value).trim().toLowerCase();

const extractSizes = (product) => {
  if (Array.isArray(product?.tallas)) {
    return product.tallas.map((size) => String(size).toUpperCase());
  }

  if (typeof product?.tallas === 'string') {
    return product.tallas
      .split(',')
      .map((size) => size.trim().toUpperCase())
      .filter(Boolean);
  }

  return [];
};

const colorMatches = (productColor, selectedColor) => {
  if (!selectedColor) return true;
  return normalizeText(productColor).includes(normalizeText(selectedColor));
};

const applyFilters = (products, filters) => {
  const filtered = products.filter((product) => {
    const price = Number(product?.precio ?? 0);
    const sizes = extractSizes(product);

    const matchesPrice = price >= filters.priceRange.min && price <= filters.priceRange.max;
    const matchesSize = !filters.size || sizes.includes(filters.size.toUpperCase());
    const matchesColor = colorMatches(product?.color, filters.color);

    return matchesPrice && matchesSize && matchesColor;
  });

  switch (filters.sortBy) {
    case 'priceAsc':
      return [...filtered].sort((a, b) => Number(a.precio) - Number(b.precio));
    case 'priceDesc':
      return [...filtered].sort((a, b) => Number(b.precio) - Number(a.precio));
    case 'nameAsc':
      return [...filtered].sort((a, b) => String(a.nombre).localeCompare(String(b.nombre), 'es'));
    default:
      return filtered;
  }
};

const ProductGrid = ({ products, favoritos, onFavoriteToggle }) => (
  <div className="catalog-grid">
    {products.map((product) => (
      <ProductCard
        key={product.id}
        product={product}
        isFavorite={favoritos.includes(product.id)}
        onFavoriteToggle={onFavoriteToggle}
        showFavoriteButton={true}
      />
    ))}
  </div>
);

const LoadingState = () => (
  <div className="catalog-state">
    <div>
      <span className="catalog-state-eyebrow">Cargando</span>
      <h3>Estamos preparando la seleccion.</h3>
      <p>En unos segundos tendras todos los productos listos para explorar.</p>
    </div>
  </div>
);

const ErrorState = ({ message }) => (
  <div className="catalog-state catalog-state--error">
    <div>
      <span className="catalog-state-eyebrow">Ups</span>
      <h3>No hemos podido cargar esta seccion.</h3>
      <p>{message}</p>
    </div>
  </div>
);

const EmptyState = () => (
  <div className="catalog-state">
    <div>
      <span className="catalog-state-eyebrow">Sin coincidencias</span>
      <h3>No hay resultados con esos filtros.</h3>
      <p>Prueba con un rango mas amplio o limpia los filtros para volver a ver toda la coleccion.</p>
    </div>
  </div>
);

const CatalogPage = ({
  apiUrl,
  title,
  subtitle,
  section,
  heroClassName,
  eyebrow,
  description,
}) => {
  const { user, isLoggedIn } = useAuth();
  const [products, setProducts] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('No se pudo cargar el catalogo.');
        }
        const data = await response.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message || 'No se pudo cargar el catalogo.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [apiUrl]);

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

  const visibleProducts = useMemo(() => applyFilters(products, filters), [products, filters]);

  const handleFavoriteToggle = (productId) => {
    setFavoritos((prevFavoritos) => (
      prevFavoritos.includes(productId)
        ? prevFavoritos.filter((id) => id !== productId)
        : [...prevFavoritos, productId]
    ));
  };

  const handleFilterChange = (nextFilters) => {
    setFilters(nextFilters);
    setShowFilters(false);
  };

  const handleClearFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  const resultsText = `${visibleProducts.length} ${visibleProducts.length === 1 ? 'producto disponible' : 'productos disponibles'}`;

  return (
    <div className={`catalog-page catalog-page--${section}`}>
      <section className={`catalog-hero ${heroClassName}`}>
        <div className="catalog-hero-overlay" />
        <div className="catalog-hero-content">
          <span className="catalog-hero-eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
      </section>

      <div className="catalog-shell">
        <section className="catalog-intro-card">
          <div>
            <span className="catalog-intro-label">Seleccion curada</span>
            <h2>{title}</h2>
          </div>
          <p>{description}</p>
        </section>

        <section className="catalog-toolbar">
          <CategoryMenu section={section} />
          <button
            type="button"
            className="catalog-filter-trigger"
            onClick={() => setShowFilters((prev) => !prev)}
          >
            <span className="catalog-filter-trigger-icon" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            <span>Filtrar y ordenar</span>
          </button>
        </section>

        <section className="catalog-results-shell">
          <div className="catalog-results-meta">
            <div>
              <span className="catalog-results-label">Catalogo</span>
              <strong>{resultsText}</strong>
            </div>
            <button type="button" className="catalog-clear-button" onClick={handleClearFilters}>
              Limpiar filtros
            </button>
          </div>

          {showFilters && (
            <button
              type="button"
              className="catalog-filter-backdrop"
              onClick={() => setShowFilters(false)}
              aria-label="Cerrar filtros"
            />
          )}

          <div className="catalog-results-layout">
            <aside className={`catalog-filter-column ${showFilters ? 'is-open' : ''}`}>
              <FilterPanel
                filters={filters}
                onFilterChange={handleFilterChange}
                onClose={() => setShowFilters(false)}
                onClear={handleClearFilters}
                productCount={visibleProducts.length}
                title={title}
              />
            </aside>

            <div className="catalog-results-content">
              {loading ? (
                <LoadingState />
              ) : error ? (
                <ErrorState message={error} />
              ) : visibleProducts.length === 0 ? (
                <EmptyState />
              ) : (
                <ProductGrid
                  products={visibleProducts}
                  favoritos={favoritos}
                  onFavoriteToggle={handleFavoriteToggle}
                />
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CatalogPage;
