import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import './styles/minimalista.css';
import { AuthProvider } from './contexts/AuthContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { CartProvider } from './contexts/CartContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminPanel from './components/admin/AdminPanel';
import HeaderMinimalista from './components/HeaderMinimalista';
import FooterMinimalista from './components/FooterMinimalista';
import LandingMinimalista from './pages/LandingMinimalista';
import Hombres from './Hombres';
import Mujeres from './Mujeres';
import Colecciones from './pages/Colecciones';
import Favoritos from './components/Favoritos';
import CamisetasHombre from './components/CamisetasHombre';
import PantalonesHombre from './components/PantalonesHombre';
import ZapatosHombre from './components/ZapatosHombre';
import ChaquetasHombre from './components/ChaquetasHombre';
import Camisetas from './components/Camisetas';
import Pantalones from './components/Pantalones';
import Vestidos from './components/Vestidos';
import Zapatos from './components/Zapatos';
import Login from './Login';
import Register from './Register';
import RecuperarContrasena from './RecuperarContrasena';
import Cart from './Cart';
import Devoluciones from './Devoluciones';
import Contacto from './Contacto';
import FaqAccordion from './FaqAccordion';
import FaqCategoria from './FaqCategoria';
import Envios from './Envios';
import SearchResult from './components/SearchResult';
import TodosProductosMujer from './pages/TodosProductosMujer';
import TodosProductosHombre from './pages/TodosProductosHombre';

function App() {
  const HeaderWrapper = () => {
    const location = useLocation();
    if (location.pathname === '/devoluciones') {
      return null;
    }
    return <HeaderMinimalista />;
  };

  const FooterWrapper = () => {
    const location = useLocation();
    if (location.pathname === '/devoluciones') {
      return null;
    }
    return <FooterMinimalista />;
  };

  return (
    <AuthProvider>
      <FavoritesProvider>
        <CartProvider>
          <Router>
            <div className="min-h-screen bg-white text-gray-900">
              <div className="App">
                <HeaderWrapper />

                <main className="main-content">
                  <Routes>
                    <Route path="/" element={<LandingMinimalista />} />
                    <Route path="/hombres" element={<Hombres />} />
                    <Route path="/hombres/camisetas" element={<CamisetasHombre />} />
                    <Route path="/hombres/pantalones" element={<PantalonesHombre />} />
                    <Route path="/hombres/zapatos" element={<ZapatosHombre />} />
                    <Route path="/hombres/chaquetas" element={<ChaquetasHombre />} />
                    <Route path="/mujeres" element={<Mujeres />} />
                    <Route path="/mujeres/camisetas" element={<Camisetas />} />
                    <Route path="/mujeres/pantalones" element={<Pantalones />} />
                    <Route path="/mujeres/vestidos" element={<Vestidos />} />
                    <Route path="/mujeres/zapatos" element={<Zapatos />} />
                    <Route path="/todos-productos-mujer" element={<TodosProductosMujer />} />
                    <Route path="/todos-productos-hombre" element={<TodosProductosHombre />} />
                    <Route path="/favoritos" element={<Favoritos />} />
                    <Route path="/colecciones" element={<Colecciones />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/registro" element={<Register />} />
                    <Route path="/recuperar-contrasena" element={<RecuperarContrasena />} />
                    <Route path="/carrito" element={<Cart />} />
                    <Route path="/devoluciones" element={<Devoluciones />} />
                    <Route path="/contacto" element={<Contacto />} />
                    <Route path="/faq" element={<FaqAccordion />} />
                    <Route path="/faq/:slug" element={<FaqCategoria />} />
                    <Route path="/envios" element={<Envios />} />
                    <Route path="/buscar" element={<SearchResult />} />
                    <Route
                      path="/admin"
                      element={(
                        <ProtectedRoute requireAdmin={true}>
                          <AdminPanel />
                        </ProtectedRoute>
                      )}
                    />
                  </Routes>
                </main>

                <FooterWrapper />
              </div>
            </div>
          </Router>
        </CartProvider>
      </FavoritesProvider>
    </AuthProvider>
  );
}

export default App;
