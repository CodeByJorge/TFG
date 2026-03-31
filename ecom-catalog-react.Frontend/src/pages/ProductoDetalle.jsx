import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import config from '../config';
import { useCart } from '../contexts/CartContext';
import { useFavorites } from '../contexts/FavoritesContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import defaultImage from '../assets/Hero.jpg';
import '../styles/producto-detalle.css';

const ProductoDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { favorites, toggleFavorite } = useFavorites();
  const { isLoggedIn } = useAuth();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [addedToCart, setAddedToCart] = useState(false);
  const [openSection, setOpenSection] = useState(null);

  const isFavorite = product ? favorites.includes(product.id) : false;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${config.PRODUCTS_URL}/${id}`);
        setProduct(response.data);
      } catch (err) {
        console.error('Error al cargar producto:', err);
        setError('No se pudo cargar el producto');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <section className="pd-page">
        <div className="pd-shell">
          <p className="pd-loading">Cargando producto...</p>
        </div>
      </section>
    );
  }

  if (error || !product) {
    return (
      <section className="pd-page">
        <div className="pd-shell">
          <p className="pd-error">{error || 'Producto no encontrado'}</p>
          <Link to="/" className="pd-back-link">Volver al inicio</Link>
        </div>
      </section>
    );
  }

  const imageSrc = product.imagenUrl || defaultImage;
  const images = [imageSrc];

  const coloresArray = typeof product.colores === 'string'
    ? product.colores.split(',').map(c => c.trim()).filter(Boolean)
    : [];

  const tallasArray = product.tallas
    ? Array.from(product.tallas).sort((a, b) => a.id - b.id)
    : [];

  const handleAddToCart = () => {
    addToCart(product);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleToggleFavorite = async () => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    await toggleFavorite(product.id);
  };

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const breadcrumbCategory = product.categoria?.nombre || 'Productos';
  const breadcrumbGender = product.categoria?.genero?.nombre === 'Hombres' ? 'Hombres' : 'Mujeres';
  const genderPath = breadcrumbGender === 'Hombres' ? '/hombres' : '/mujeres';

  return (
    <section className="pd-page">
      <div className="pd-shell">
        <nav className="pd-breadcrumb">
          <Link to="/">Inicio</Link>
          <span>/</span>
          <Link to={genderPath}>{breadcrumbGender}</Link>
          <span>/</span>
          <span>{breadcrumbCategory}</span>
        </nav>

        <div className="pd-layout">
          {/* Galeria de imagenes */}
          <div className="pd-gallery">
            <div className="pd-main-image">
              <img src={images[selectedImage]} alt={product.nombre} />
            </div>
            {images.length > 1 && (
              <div className="pd-thumbnails">
                {images.map((img, index) => (
                  <button
                    key={index}
                    className={`pd-thumbnail ${selectedImage === index ? 'active' : ''}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img src={img} alt={`${product.nombre} - vista ${index + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info del producto */}
          <div className="pd-info">
            {product.categoria && (
              <span className="pd-category">{product.categoria.nombre}</span>
            )}
            <h1 className="pd-title">{product.nombre}</h1>

            <div className="pd-price-row">
              <span className="pd-price">{product.precio?.toFixed(2)} €</span>
              {product.precioAnterior && (
                <span className="pd-price-old">{product.precioAnterior} €</span>
              )}
            </div>

            {/* Selector de colores */}
            {coloresArray.length > 0 && (
              <div className="pd-colors">
                <span className="pd-label">Color</span>
                <div className="pd-color-options">
                  {coloresArray.map((color, index) => (
                    <button
                      key={index}
                      className={`pd-color-circle ${selectedColor === index ? 'selected' : ''}`}
                      style={{ backgroundColor: color }}
                      onClick={() => setSelectedColor(index)}
                      aria-label={`Color ${color}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Selector de tallas */}
            {tallasArray.length > 0 && (
              <div className="pd-sizes">
                <span className="pd-label">Talla</span>
                <div className="pd-size-options">
                  {tallasArray.map((talla) => (
                    <button
                      key={talla.id}
                      className={`pd-size-btn ${selectedSize === talla.id ? 'selected' : ''}`}
                      onClick={() => setSelectedSize(talla.id)}
                    >
                      {talla.nombre}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Botones de accion */}
            <div className="pd-actions">
              <button
                className={`pd-add-to-cart ${addedToCart ? 'added' : ''}`}
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                {addedToCart ? 'Añadido al carrito' : product.stock === 0 ? 'Agotado' : 'Añadir al carrito'}
              </button>
              <button
                className={`pd-favorite-btn ${isFavorite ? 'active' : ''}`}
                onClick={handleToggleFavorite}
                aria-label={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </button>
            </div>

            {/* Info envio y devoluciones */}
            <div className="pd-shipping-info">
              <div className="pd-shipping-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="1" y="6" width="22" height="13" rx="2"/>
                  <path d="M1 10h22"/>
                </svg>
                <span>Envio gratuito en pedidos superiores a 30€</span>
              </div>
              <div className="pd-shipping-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <polyline points="1 4 1 10 7 10"/>
                  <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
                </svg>
                <span>Devoluciones gratuitas en 30 dias</span>
              </div>
            </div>

            {/* Secciones desplegables (acordeon) */}
            <div className="pd-accordion">
              <div className="pd-accordion-item">
                <button className={`pd-accordion-header ${openSection === 'descripcion' ? 'open' : ''}`} onClick={() => toggleSection('descripcion')}>
                  <span>Descripcion del producto</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d={openSection === 'descripcion' ? 'M18 15l-6-6-6 6' : 'M6 9l6 6 6-6'}/>
                  </svg>
                </button>
                {openSection === 'descripcion' && (
                  <div className="pd-accordion-body">
                    <p>{product.descripcion || 'Sin descripcion disponible.'}</p>
                  </div>
                )}
              </div>

              <div className="pd-accordion-item">
                <button className={`pd-accordion-header ${openSection === 'composicion' ? 'open' : ''}`} onClick={() => toggleSection('composicion')}>
                  <span>Composicion y cuidados</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d={openSection === 'composicion' ? 'M18 15l-6-6-6 6' : 'M6 9l6 6 6-6'}/>
                  </svg>
                </button>
                {openSection === 'composicion' && (
                  <div className="pd-accordion-body">
                    <p>Consulta la etiqueta del producto para informacion detallada sobre composicion y cuidados.</p>
                  </div>
                )}
              </div>

              <div className="pd-accordion-item">
                <button className={`pd-accordion-header ${openSection === 'tallas' ? 'open' : ''}`} onClick={() => toggleSection('tallas')}>
                  <span>Tallas disponibles</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d={openSection === 'tallas' ? 'M18 15l-6-6-6 6' : 'M6 9l6 6 6-6'}/>
                  </svg>
                </button>
                {openSection === 'tallas' && (
                  <div className="pd-accordion-body">
                    {tallasArray.length > 0 ? (
                      <div className="pd-accordion-sizes">
                        {tallasArray.map((talla) => (
                          <span key={talla.id} className="pd-accordion-size-pill">{talla.nombre}</span>
                        ))}
                      </div>
                    ) : (
                      <p>Talla unica disponible.</p>
                    )}
                  </div>
                )}
              </div>

              <div className="pd-accordion-item">
                <button className={`pd-accordion-header ${openSection === 'entrega' ? 'open' : ''}`} onClick={() => toggleSection('entrega')}>
                  <span>Entrega y devoluciones</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d={openSection === 'entrega' ? 'M18 15l-6-6-6 6' : 'M6 9l6 6 6-6'}/>
                  </svg>
                </button>
                {openSection === 'entrega' && (
                  <div className="pd-accordion-body">
                    <p>Envio estandar gratuito en pedidos superiores a 30€. Entrega estimada en 3-5 dias laborables.</p>
                    <p>Devoluciones gratuitas en un plazo de 30 dias desde la recepcion del pedido.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductoDetalle;
