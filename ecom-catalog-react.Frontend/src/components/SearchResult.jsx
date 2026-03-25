import config from '../config';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from './ProductCard';
import './SearchResult.css';

const SearchResult = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!searchQuery) {
        setProducts([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(config.productSearchUrl(searchQuery));
        
        if (!response.ok) {
          throw new Error('Error al buscar productos');
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error en la bÃºsqueda:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchQuery]);

  if (loading) {
    return <div className="search-loading">Buscando productos...</div>;
  }

  if (error) {
    return <div className="search-error">{error}</div>;
  }

  if (!searchQuery) {
    return <div className="search-empty">Ingresa un tÃ©rmino de bÃºsqueda</div>;
  }

  if (products.length === 0) {
    return <div className="search-empty">No se encontraron productos para: {searchQuery}</div>;
  }

  return (
    <div className="search-results">
      <h2>Resultados de bÃºsqueda para: {searchQuery}</h2>
      <div className="search-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchResult; 

