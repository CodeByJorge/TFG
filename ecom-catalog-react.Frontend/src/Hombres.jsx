import config from './config';
import React, { useState, useEffect } from 'react';
import ProductCard from './components/ProductCard';
import { useAuth } from './contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Hombres.css';

const Hombres = () => {
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(config.productGenreNameUrl('Hombres'));
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

  const handleVerTodo = () => {
    navigate('/todos-productos-hombre');
  };

  const productsToShow = showAll ? products : products.slice(0, 4);

  return (
    <>
      <div className="hombres-container">
        <div className="hombres-content">
          <h1>ColecciÃ³n Hombres</h1>
          <p>Descubre nuestra nueva colecciÃ³n para hombres</p>
        </div>
      </div>

      <div className="hombres-section">
        {loading ? (
          <div className="loading">Cargando productos...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          <>
            <div className="products-header">
              <button 
                className="ver-todo-btn" 
                onClick={handleVerTodo}
              >
                Ver todo
              </button>
            </div>
            <div className="hombres-grid">
              {productsToShow.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isFavorite={favoritos.includes(product.id)}
                  onFavoriteToggle={handleFavoriteToggle}
                  showFavoriteButton={true}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Hombres; 

