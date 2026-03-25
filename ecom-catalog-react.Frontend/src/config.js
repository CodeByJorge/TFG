const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000';

const config = {
  API_URL: API_BASE_URL,
  PRODUCTS_URL: `${API_BASE_URL}/api/productos`,
  USERS_URL: `${API_BASE_URL}/api/usuarios`,
  CATEGORIES_URL: `${API_BASE_URL}/api/categorias`,
  GENRES_URL: `${API_BASE_URL}/api/generos`,
  FAVORITES_URL: `${API_BASE_URL}/api/favoritos`,
  productCategoryUrl: (categoryId) => `${API_BASE_URL}/api/productos/categoria/${categoryId}`,
  productGenreNameUrl: (genreName) => `${API_BASE_URL}/api/productos/genero/nombre/${genreName}`,
  productSearchUrl: (query) => `${API_BASE_URL}/api/productos/buscar?query=${encodeURIComponent(query)}`
};

export default config; 
