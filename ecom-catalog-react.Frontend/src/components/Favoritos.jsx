import config from '../config';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { useFavorites } from '../contexts/FavoritesContext';
import ProductCard from './ProductCard';
import './Favoritos.css';

const Favoritos = () => {
  const { user, isLoggedIn } = useAuth();
  const { favorites, toggleFavorite } = useFavorites();
  const [favoritos, setFavoritos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavoritos = async () => {
      if (!isLoggedIn || !user?.token) {
        setError('Debes iniciar sesiÃ³n para ver tus favoritos');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(config.FAVORITES_URL, {
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json'
          }
        });
        setFavoritos(response.data);
      } catch (error) {
        console.error('Error al cargar favoritos:', error);
        setError('Error al cargar tus favoritos');
      } finally {
        setLoading(false);
      }
    };

    fetchFavoritos();
  }, [isLoggedIn, user, favorites]);

  const handleFavoriteToggle = async (productId, productElement) => {
    const success = await toggleFavorite(productId, productElement);
    if (success) {
      setFavoritos(prevFavoritos => prevFavoritos.filter(fav => fav.producto.id !== productId));
    }
  };

  if (loading) {
    return <div className="loading">Cargando favoritos...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!isLoggedIn) {
    return <div className="error">Debes iniciar sesiÃ³n para ver tus favoritos</div>;
  }

  return (
    <div className="favoritos-container">
      <div className="favoritos-hero">
        <div className="favoritos-content">
          <h1>Mis Favoritos</h1>
          <p>Productos que te han gustado</p>
        </div>
      </div>

      <div className="products-container">
        {favoritos.length === 0 ? (
          <div className="no-favoritos">
            <p>No tienes productos favoritos aÃºn</p>
          </div>
        ) : (
          <div className="products-grid">
            {favoritos.map((favorito) => (
              <ProductCard
                key={favorito.producto.id}
                product={favorito.producto}
                isFavorite={true}
                onFavoriteToggle={handleFavoriteToggle}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favoritos; 

