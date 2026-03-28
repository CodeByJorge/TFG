import config from '../config';
const API_URL = config.USERS_URL;

class AuthService {
  constructor() {
    this.user = this.loadUserFromStorage();
  }

  loadUserFromStorage() {
    try {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) return null;
      
      const userData = JSON.parse(storedUser);
      if (!userData.token) {
        this.logout();
        return null;
      }
      
      return userData;
    } catch (error) {
      console.error('Error al cargar usuario del almacenamiento:', error);
      this.logout();
      return null;
    }
  }

  async login(email, password) {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error en el inicio de sesión');
      }

      if (!data.token) {
        throw new Error('No se recibió el token de autenticación');
      }

      const userData = {
        ...data,
        token: data.token
      };

      localStorage.setItem('user', JSON.stringify(userData));
      this.user = userData;
      return userData;
    } catch (error) {
      console.error('Error en login:', error);
      this.logout();
      throw error;
    }
  }

  async register(userData) {
    try {
      const response = await fetch(`${API_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Error en el registro');
      }

      return await response.json();
    } catch (error) {
      console.error('Error en registro:', error);
      throw error;
    }
  }

  logout() {
    localStorage.removeItem('user');
    this.user = null;
  }

  isLoggedIn() {
    return !!this.user?.token;
  }

  isAdmin() {
    return this.user?.rol === 'ADMIN';
  }

  getCurrentUser() {
    return this.user;
  }

  getToken() {
    return this.user?.token;
  }

  // Método para validar el token
  validateToken() {
    if (!this.user?.token) {
      this.logout();
      return false;
    }
    return true;
  }
}

export default new AuthService(); 

