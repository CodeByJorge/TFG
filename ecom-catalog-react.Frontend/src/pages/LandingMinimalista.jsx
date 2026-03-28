import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import { useCart } from '../contexts/CartContext';

import config from '../config';

import ProductCardMinimalista from '../components/ProductCardMinimalista';

import heroImage from '../assets/Hero.jpg';

import womenImage from '../assets/pngtree-women-shopping-at-dress-store-vector-picture-image_2300545.jpg';

import menImage from '../assets/retrato-hombre-comprando-comprando-bienes-consumo_23-2151669773.jpg';

// Nombre de archivo sin tildes: "chaqueta" (no "chaquíeta") — Docker/Linux distingue el carácter exacto.
import fittingImage from '../assets/hombre-pie-frente-al-espejo-intentando-chaqueta-tienda_641503-262513.jpg';

import '../styles/minimalista.css';

import '../styles/minimalista-components.css';

import '../styles/landing-minimalista.css';



const demoProducts = [

  {

    id: 1,

    nombre: 'Blazer fluido',

    descripcion: 'Una pieza limpia y versátil para elevar cualquier look.',

    precio: 79.9,

    imagenUrl: womenImage,

    categoria: { nombre: 'Blazers', genero: { nombre: 'Mujeres' } },

  },

  {

    id: 2,

    nombre: 'Camisa estructurada',

    descripcion: 'Corte recto, textura suave y silueta precisa.',

    precio: 54.9,

    imagenUrl: menImage,

    categoria: { nombre: 'Camisas', genero: { nombre: 'Hombres' } },

  },

  {

    id: 3,

    nombre: 'Abrigo minimal',

    descripcion: 'Abrigo largo con caída elegante y líneas puras.',

    precio: 129.0,

    imagenUrl: fittingImage,

    categoria: { nombre: 'Abrigos', genero: { nombre: 'Hombres' } },

  },

  {

    id: 4,

    nombre: 'Vestido esencial',

    descripcion: 'Diseño atemporal con presencia ligera y contemporánea.',

    precio: 89.0,

    imagenUrl: heroImage,

    categoria: { nombre: 'Vestidos', genero: { nombre: 'Mujeres' } },

  },

];



const LandingMinimalista = () => {

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const { cartItemsCount } = useCart();



  useEffect(() => {

    const loadFeaturedProducts = async () => {

      try {

        const response = await fetch(config.PRODUCTS_URL);

        if (!response.ok) {

          throw new Error('No se pudo cargar el catálogo');

        }

        const data = await response.json();

        const normalized = Array.isArray(data) && data.length > 0 ? data.slice(0, 4) : demoProducts;

        setProducts(normalized);

      } catch (error) {

        setProducts(demoProducts);

      } finally {

        setLoading(false);

      }

    };



    loadFeaturedProducts();

  }, []);



  return (

    <div className="landing-minimalista">

      <section className="landing-hero" style={{ backgroundImage: `linear-gradient(180deg, rgba(255,255,255,0.28), rgba(255,255,255,0.82)), url(${heroImage})` }}>

        <Link to="/carrito" className="landing-cart-pill" aria-label="Carrito">

          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">

            <path d="M6 7h12l-1 12H7L6 7Z" />

            <path d="M9 7a3 3 0 0 1 6 0" />

          </svg>

          <span className="landing-cart-copy">

            <strong>Carrito</strong>

            <small>Ver pedido</small>

          </span>

          {cartItemsCount > 0 && <strong>{cartItemsCount}</strong>}

          <span className="landing-cart-chevron"></span>

        </Link>

        <div className="landing-hero-copy">

          <span className="landing-hero-tag">F. Minimal</span>

          <h1>Moda esencial para cada día.</h1>

          <p>

            Prendas versátiles, categorías claras y una forma de comprar sencilla desde el primer vistazo.

          </p>

          <div className="landing-hero-actions">

            <Link to="/mujeres" className="landing-button landing-button-primary">Mujeres</Link>

            <Link to="/hombres" className="landing-button landing-button-secondary">Hombres</Link>

          </div>

        </div>

        <div className="landing-hero-note">

          <strong>Selección</strong>

          <span>Silencioso, elegante y fácil de navegar.</span>

        </div>

      </section>



      <section className="landing-editorial">

        <div>

          <span>Nueva temporada</span>

          <h2>Encuentra antes lo que te apetece llevar.</h2>

        </div>

        <p>

          Hemos reunido mujer y hombre en una portada clara para que puedas entrar, descubrir y comprar sin complicaciones.

        </p>

      </section>



      <section className="landing-collections">

        <Link to="/mujeres" className="landing-collection-card">

          <img src={womenImage} alt="Colección mujeres" />

          <div>

            <span>Colección</span>

            <strong>Mujeres</strong>

          </div>

        </Link>

        <Link to="/hombres" className="landing-collection-card">

          <img src={menImage} alt="Colección hombres" />

          <div>

            <span>Colección</span>

            <strong>Hombres</strong>

          </div>

        </Link>

      </section>



      <section className="landing-featured">

        <div className="landing-section-head">

          <span>Productos destacados</span>

          <h2>Selección de la semana</h2>

        </div>



        {loading ? (

          <div className="landing-state">Cargando productos...</div>

        ) : (

          <div className="landing-grid">

            {products.map((product) => (

              <ProductCardMinimalista key={product.id} product={product} />

            ))}

          </div>

        )}

      </section>



      <section className="landing-trust">

        <div>

          <strong>Entrega ágil</strong>

          <span>Recibe tu pedido de forma rápida y sencilla.</span>

        </div>

        <div>

          <strong>Pago seguro</strong>

          <span>Compra con tranquilidad en cada paso.</span>

        </div>

        <div>

          <strong>Atención cuidada</strong>

          <span>Estamos aquí para ayudarte cuando lo necesites.</span>

        </div>

      </section>

    </div>

  );

};



export default LandingMinimalista;





