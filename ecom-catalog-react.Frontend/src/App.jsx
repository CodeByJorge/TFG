import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import CatalogPage from './components/CatalogPage';
import config from './config';
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
import MiCuenta from './pages/MiCuenta';

function App() {
  const HeaderWrapper = () => <HeaderMinimalista />;

  const FooterWrapper = () => <FooterMinimalista />;

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
                    <Route path="/hombres/novedades" element={<CatalogPage apiUrl={`${config.PRODUCTS_URL}/genero/nombre/Hombres`} title="Novedades" subtitle="Lo último en moda masculina" section="hombre" eyebrow="New in" description="Descubre las últimas incorporaciones a nuestra colección." filtro="novedades" />} />
                    <Route path="/hombres/accesorios" element={<CatalogPage apiUrl={`${config.PRODUCTS_URL}/genero/nombre/Hombres`} title="Accesorios" subtitle="Complementa tu estilo" section="hombre" eyebrow="Accesorios" description="Relojes, cinturones, carteras y más." filtro="accesorios" />} />
                    <Route path="/hombres/rebajas" element={<CatalogPage apiUrl={`${config.PRODUCTS_URL}/genero/nombre/Hombres`} title="Rebajas" subtitle="Las mejores ofertas en moda" section="hombre" eyebrow="Sale" description="Productos seleccionados con descuento." filtro="rebajas" />} />
                    <Route path="/mujeres" element={<Mujeres />} />
                    <Route path="/mujeres/camisetas" element={<Camisetas />} />
                    <Route path="/mujeres/pantalones" element={<Pantalones />} />
                    <Route path="/mujeres/vestidos" element={<Vestidos />} />
                    <Route path="/mujeres/zapatos" element={<Zapatos />} />
                    <Route path="/mujeres/novedades" element={<CatalogPage apiUrl={`${config.PRODUCTS_URL}/genero/nombre/Mujeres`} title="Novedades" subtitle="Lo último en moda femenina" section="mujer" eyebrow="New in" description="Descubre las últimas incorporaciones a nuestra colección." filtro="novedades" />} />
                    <Route path="/mujeres/accesorios" element={<CatalogPage apiUrl={`${config.PRODUCTS_URL}/genero/nombre/Mujeres`} title="Accesorios" subtitle="Complementa tu estilo" section="mujer" eyebrow="Accesorios" description="Bolsos, cinturones, joyería y más." filtro="accesorios" />} />
                    <Route path="/mujeres/rebajas" element={<CatalogPage apiUrl={`${config.PRODUCTS_URL}/genero/nombre/Mujeres`} title="Rebajas" subtitle="Las mejores ofertas en moda" section="mujer" eyebrow="Sale" description="Productos seleccionados con descuento." filtro="rebajas" />} />
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
                    <Route path="/mi-cuenta" element={<ProtectedRoute><MiCuenta /></ProtectedRoute>} />
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
