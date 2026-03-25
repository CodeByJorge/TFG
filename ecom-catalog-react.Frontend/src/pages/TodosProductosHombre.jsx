import config from '../config';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import FilterPanel from '../components/FilterPanel';
import CategoryMenu from '../components/CategoryMenu';
import './TodosProductosHombre.css';
import { useAuth } from '../contexts/AuthContext';

const API_URL = config.productGenreNameUrl('Hombres');

const HeroSection = () => (
  <div className="todos-hero">
    <div className="todos-content">
      <h1>Todos los Productos</h1>
      <p>Descubre nuestra colecciÃ³n completa para mujer</p>
    </div>
  </div>
);

const HeaderImage = () => (
  <div className="header-image">
    <div className="header-image-content">
      <h2>Nueva ColecciÃ³n</h2>
      <p>Descubre las Ãºltimas tendencias</p>
    </div>
  </div>
);

const LoadingState = () => (
  <div className="loading">Cargando productos...</div>
);

const ErrorState = ({ message }) => (
  <div className="error">{message}</div>
);

const ProductGrid = ({ products, favoritos, onFavoriteToggle }) => (
  <div className="todos-productos-grid">
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

const FilterButton = ({ onClick }) => (
  <button className="filter-toggle-button" onClick={onClick}>
    <div className="filter-icon">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <span className="filter-text">Filtrar</span>
  </button>
);

const TodosProductosHombre = () => {
  const { user, isLoggedIn } = useAuth();
  const [products, setProducts] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: [0, 1000],
    sizes: [],
    colors: []
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Error al cargar los productos');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchFavoritos = async () => {
      if (!isLoggedIn || !user?.token) return;
      try {
        const response = await axios.get(config.FAVORITES_URL, {
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json'
          }
        });
        setFavoritos(response.data.map(fav => fav.producto.id));
      } catch (error) {
        console.error('Error al cargar favoritos:', error);
      }
    };
    fetchFavoritos();
  }, [isLoggedIn, user]);

  const handleFavoriteToggle = (productId) => {
    setFavoritos(prevFavoritos => {
      if (prevFavoritos.includes(productId)) {
        return prevFavoritos.filter(id => id !== productId);
      } else {
        return [...prevFavoritos, productId];
      }
    });
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setShowFilters(false);
  };

  const handleCloseFilters = () => {
    setShowFilters(false);
  };

  const filteredProducts = products.filter(product => {
    const matchesPrice = product.precio >= filters.priceRange[0] && product.precio <= filters.priceRange[1];
    const matchesSize = filters.sizes.length === 0 || filters.sizes.some(size => product.tallas.includes(size));
    const matchesColor = filters.colors.length === 0 || filters.colors.includes(product.color);
    return matchesPrice && matchesSize && matchesColor;
  });

  const renderContent = () => {
    if (loading) return <LoadingState />;
    if (error) return <ErrorState message={error} />;
    return <ProductGrid products={filteredProducts} favoritos={favoritos} onFavoriteToggle={handleFavoriteToggle} />;
  };

  return (
    <div className="todos-productos-mujer">
      <div className="filter-section">
        <div className="category-menu-container">
          <CategoryMenu />
        </div>
        <div className="filter-button-container">
          <FilterButton onClick={() => setShowFilters(!showFilters)} />
        </div>
      </div>
      <div className="products-container">
        {showFilters && (
          <div className="filter-sidebar">
            <FilterPanel 
              onFilterChange={handleFilterChange}
              onClose={handleCloseFilters}
              filters={filters}
            />
          </div>
        )}
        {renderContent()}
      </div>
    </div>
  );
};

export default TodosProductosHombre; 

