import config from '../config';
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const FavoritesContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites debe ser usado dentro de un FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider = ({ children }) => {
  const { user, isLoggedIn } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [animatingProduct, setAnimatingProduct] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!isLoggedIn || !user?.token) {
        setFavorites([]);
        setFavoritesCount(0);
        return;
      }

      try {
        const response = await axios.get(config.FAVORITES_URL, {
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json'
          }
        });
        const favoritesData = response.data.map(fav => fav.producto.id);
        setFavorites(favoritesData);
        setFavoritesCount(favoritesData.length);
      } catch (error) {
        console.error('Error al cargar favoritos:', error);
      }
    };

    fetchFavorites();
  }, [isLoggedIn, user]);

  const toggleFavorite = async (productId, productElement) => {
    if (!isLoggedIn || !user?.token) {
      return false;
    }

    try {
      const headers = {
        'Authorization': `Bearer ${user.token}`,
        'Content-Type': 'application/json'
      };

      if (favorites.includes(productId)) {
        await axios.delete(`${config.FAVORITES_URL}/${productId}`, { headers });
        setFavorites(prev => prev.filter(id => id !== productId));
        setFavoritesCount(prev => prev - 1);
      } else {
        await axios.post(`${config.FAVORITES_URL}/${productId}`, {}, { headers });
        setFavorites(prev => [...prev, productId]);
        setFavoritesCount(prev => prev + 1);
        
        // Trigger animation
        if (productElement) {
          setAnimatingProduct({
            id: productId,
            element: productElement
          });
        }
      }
      return true;
    } catch (error) {
      console.error('Error al actualizar favoritos:', error);
      return false;
    }
  };

  return (
    <FavoritesContext.Provider value={{
      favorites,
      favoritesCount,
      toggleFavorite,
      animatingProduct,
      setAnimatingProduct
    }}>
      {children}
    </FavoritesContext.Provider>
  );
}; 

