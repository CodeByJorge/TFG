import React from 'react';

import { Link } from 'react-router-dom';

import { useCart } from './contexts/CartContext';

import './Cart.css';



const Cart = () => {

  const { cart = [], updateQuantity, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + (item.precio * item.quantity), 0);



  if (cart.length === 0) {

    return (

      <section className="cart-page cart-page-empty">

        <div className="cart-shell">

          <p className="cart-eyebrow">Carrito</p>

          <h1>Tu selección está vacía.</h1>

          <p className="cart-empty-copy">

            Cuando añadas prendas al carrito, aparecerán aquí con un resumen claro y listo para continuar.

          </p>

          <Link to="/colecciones" className="cart-primary-link">

            Seguir explorando

          </Link>

        </div>

      </section>

    );

  }



  return (

    <section className="cart-page">

      <div className="cart-shell">

        <div className="cart-heading">

          <div>

            <p className="cart-eyebrow">Carrito</p>

            <h1>Revisa tu pedido.</h1>

          </div>

          <button type="button" className="cart-clear-link" onClick={clearCart}>

            Vaciar carrito

          </button>

        </div>



        <div className="cart-layout">

          <div className="cart-items-list">

            {cart.map((item) => (

              <article key={item.id} className="cart-item-card">

                <img src={item.imagenUrl} alt={item.nombre} className="cart-item-image" />



                <div className="cart-item-copy">

                  <p className="cart-item-kicker">{item.categoria?.nombre || 'Colección'}</p>

                  <h3>{item.nombre}</h3>

                  <p className="cart-item-price">{item.precio.toFixed(2)} EUR</p>

                </div>



                <div className="cart-item-actions">

                  <div className="cart-quantity-controls">

                    <button type="button" className="cart-quantity-button" onClick={() => updateQuantity(item.id, item.quantity - 1)}>

                      -

                    </button>

                    <span className="cart-quantity-value">{item.quantity}</span>

                    <button type="button" className="cart-quantity-button" onClick={() => updateQuantity(item.id, item.quantity + 1)}>

                      +

                    </button>

                  </div>



                  <button type="button" className="cart-remove-link" onClick={() => removeFromCart(item.id)}>

                    Eliminar

                  </button>

                </div>

              </article>

            ))}

          </div>



          <aside className="cart-summary-card">

            <p className="cart-summary-kicker">Resumen</p>

            <div className="cart-summary-row">

              <span>Subtotal</span>

              <strong>{total.toFixed(2)} EUR</strong>

            </div>

            <div className="cart-summary-row">

              <span>Envío</span>

              <strong>Gratis</strong>

            </div>

            <div className="cart-summary-row cart-summary-total">

              <span>Total</span>

              <strong>{total.toFixed(2)} EUR</strong>

            </div>

            <button type="button" className="cart-primary-button">

              Continuar al pago

            </button>

            <Link to="/colecciones" className="cart-secondary-link">

              Seguir comprando

            </Link>

          </aside>

        </div>

      </div>

    </section>

  );

};



export default Cart;

