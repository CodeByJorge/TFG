import config from '../config';
/**
 * Componente Pantalones
 * 
 * Este componente representa la pÃ¡gina de pantalones para la secciÃ³n de mujeres.
 * Incluye una secciÃ³n hero y un grid de productos.
 * 
 * @component
 * @requires React
 * @requires ProductCard
 * @requires Pantalones.css
 */
import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import axios from 'axios';
import FilterPanel from './FilterPanel';
import CategoryMenu from './CategoryMenu';
import { useAuth } from '../contexts/AuthContext';
import './Pantalones.css';

/**
 * URL base para la API de productos de pantalones de mujer
 * @constant {string}
 */
const API_URL = config.productCategoryUrl(11);

/**
 * Componente que renderiza la secciÃ³n hero de la pÃ¡gina
 * @component
 * @returns {JSX.Element} SecciÃ³n hero con tÃ­tulo y descripciÃ³n
 */
const HeroSection = () => (
  <div className="pantalones-hero">
    <div className="pantalones-content">
      <h1>Pantalones</h1>
      <p>Descubre nuestra colecciÃ³n de pantalones para mujer</p>
    </div>
  </div>
);

/**
 * Componente que muestra el estado de carga
 * @component
 * @returns {JSX.Element} Mensaje de carga
 */
const LoadingState = () => (
  <div className="loading">Cargando productos...</div>
);

/**
 * Componente que muestra mensajes de error
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {string} props.message - Mensaje de error a mostrar
 * @returns {JSX.Element} Mensaje de error
 */
const ErrorState = ({ message }) => (
  <div className="error">{message}</div>
);

const ProductGrid = ({ products, favoritos, onFavoriteToggle }) => (
  <div className="pantalones-grid">
    {products.map((product) => (
      <ProductCard
        key={product.id}
        product={product}
        isFavorite={favoritos.includes(product.id)}
        onFavoriteToggle={onFavoriteToggle}
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
    <span className="filter-text">Filtro</span>
  </button>
);

/**
 * Componente principal de la pÃ¡gina de pantalones
 * @component
 * @returns {JSX.Element} PÃ¡gina completa de pantalones
 */
const Pantalones = () => {
  const { user, isLoggedIn } = useAuth();
  const [products, setProducts] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: { min: 0, max: 250 },
    sortBy: 'priceAsc',
    size: '',
    color: ''
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Error al cargar los productos');
        }
        const data = await response.json();
        
        // Aplicar filtros
        let filteredData = [...data];
        
        // Filtrar por rango de precio
        filteredData = filteredData.filter(product => 
          product.precio >= filters.priceRange.min && 
          product.precio <= filters.priceRange.max
        );

        // Filtrar por talla si estÃ¡ seleccionada
        if (filters.size) {
          filteredData = filteredData.filter(product => 
            product.tallas && product.tallas.includes(filters.size)
          );
        }

        // Filtrar por color si estÃ¡ seleccionado
        if (filters.color) {
          filteredData = filteredData.filter(product => 
            product.color && product.color.toLowerCase() === filters.color
          );
        }

        // Ordenar por precio
        if (filters.sortBy === 'priceAsc') {
          filteredData.sort((a, b) => a.precio - b.precio);
        } else if (filters.sortBy === 'priceDesc') {
          filteredData.sort((a, b) => b.precio - a.precio);
        }

        setProducts(filteredData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [filters]);

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

  const renderContent = () => {
    if (loading) return <LoadingState />;
    if (error) return <ErrorState message={error} />;
    return <ProductGrid products={products} favoritos={favoritos} onFavoriteToggle={handleFavoriteToggle} />;
  };

  return (
    <div className="pantalones-container">
      <HeroSection />
      <div className="products-container">
        <div className="filter-section">
          <div className="category-menu-container">
            <CategoryMenu />
          </div>
          <div className="filter-button-container">
            <FilterButton onClick={() => setShowFilters(!showFilters)} />
          </div>
        </div>
        {showFilters && (
          <div className="filter-sidebar">
            <FilterPanel 
              onFilterChange={handleFilterChange}
              onClose={handleCloseFilters}
            />
          </div>
        )}
        {renderContent()}
      </div>
    </div>
  );
};

export default Pantalones;

