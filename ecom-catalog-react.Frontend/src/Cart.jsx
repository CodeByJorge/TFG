import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './contexts/CartContext';
import './Cart.css';

const Cart = () => {
  const { cart = [], updateQuantity, removeFromCart, clearCart } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [couponMessage, setCouponMessage] = useState(null);
  const [couponDiscount, setCouponDiscount] = useState(0);

  const subtotal = cart.reduce((sum, item) => sum + (item.precio * item.quantity), 0);
  const shippingCost = subtotal >= 30 ? 0 : 4.95;
  const totalBeforeTax = subtotal - couponDiscount + shippingCost;
  const iva = totalBeforeTax * 0.21;
  const total = totalBeforeTax + iva;

  const handleApplyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (!code) {
      setCouponMessage({ type: 'error', text: 'Introduce un codigo de cupon' });
      return;
    }
    if (code === 'WELCOME10') {
      const discount = subtotal * 0.10;
      setCouponDiscount(discount);
      setCouponMessage({ type: 'success', text: `Cupon aplicado: -${discount.toFixed(2)} €` });
    } else if (code === 'MODA5') {
      setCouponDiscount(5);
      setCouponMessage({ type: 'success', text: 'Cupon aplicado: -5.00 €' });
    } else {
      setCouponDiscount(0);
      setCouponMessage({ type: 'error', text: 'Cupon no valido' });
    }
  };

  if (cart.length === 0) {
    return (
      <section className="cart-page cart-page-empty">
        <div className="cart-shell">
          <p className="cart-eyebrow">Carrito</p>
          <h1>Tu seleccion esta vacia.</h1>
          <p className="cart-empty-copy">
            Cuando anadas prendas al carrito, apareceran aqui con un resumen claro y listo para continuar.
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
                  <p className="cart-item-kicker">{item.categoria?.nombre || 'Coleccion'}</p>
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

            {/* Seccion de cupones */}
            <div className="cart-coupon-section">
              <label className="cart-coupon-label">Cupon o tarjeta regalo</label>
              <div className="cart-coupon-row">
                <input
                  type="text"
                  className="cart-coupon-input"
                  placeholder="Introduce tu codigo"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleApplyCoupon()}
                />
                <button type="button" className="cart-coupon-btn" onClick={handleApplyCoupon}>
                  Aplicar
                </button>
              </div>
              {couponMessage && (
                <p className={`cart-coupon-msg ${couponMessage.type}`}>
                  {couponMessage.text}
                </p>
              )}
            </div>

            <div className="cart-summary-row">
              <span>Subtotal</span>
              <strong>{subtotal.toFixed(2)} €</strong>
            </div>
            {couponDiscount > 0 && (
              <div className="cart-summary-row cart-summary-discount">
                <span>Descuento</span>
                <strong>-{couponDiscount.toFixed(2)} €</strong>
              </div>
            )}
            <div className="cart-summary-row">
              <span>Envio</span>
              <strong>{shippingCost === 0 ? 'Gratis' : `${shippingCost.toFixed(2)} €`}</strong>
            </div>
            {shippingCost > 0 && (
              <p className="cart-free-shipping-hint">
                Anade {(30 - subtotal).toFixed(2)} € mas para envio gratuito
              </p>
            )}
            <div className="cart-summary-row">
              <span>IVA (21%)</span>
              <strong>{iva.toFixed(2)} €</strong>
            </div>
            <div className="cart-summary-row cart-summary-total">
              <span>Total</span>
              <strong>{total.toFixed(2)} €</strong>
            </div>

            <button type="button" className="cart-primary-button">
              Continuar al pago
            </button>

            <Link to="/colecciones" className="cart-secondary-link">
              Seguir comprando
            </Link>

            <div className="cart-payment-methods">
              <span className="cart-payment-label">Aceptamos</span>
              <div className="cart-payment-grid">
                {/* Visa */}
                <span className="cpb cpb-visa">
                  <em>VISA</em>
                </span>
                {/* Mastercard */}
                <span className="cpb cpb-mastercard">
                  <span className="mc-c mc-c--red" />
                  <span className="mc-c mc-c--yellow" />
                </span>
                {/* Amex */}
                <span className="cpb cpb-amex">
                  <span className="amex-inner">
                    <span className="amex-top">AMERICAN</span>
                    <span className="amex-mid">EXPRESS</span>
                  </span>
                </span>
                {/* Klarna */}
                <span className="cpb cpb-klarna">
                  <span>Klarna<b>.</b></span>
                </span>
                {/* Apple Pay */}
                <span className="cpb cpb-applepay">
                  <svg width="14" height="14" viewBox="0 0 814 1000" fill="currentColor" aria-hidden="true">
                    <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 376.6 0 279.2 0 186.9 0 74.6 61.3 14.4 120.3 14.4c50.7 0 92.9 33.6 124.8 33.6 30.4 0 78.1-35.8 136.4-35.8 23.4 0 108.2 1.9 162.6 86.6zM390.2 93.7c-21.2-28.4-56.3-50.1-91.4-50.1-4.9 0-9.7.6-13 1.3-1.3 26.6 9.7 53.9 29.2 72.7 18.6 18.6 47.7 32.4 73.7 32.4 4.5 0 9.1-.6 12.4-1.3.6-27.2-9.1-53.3-10.9-55z"/>
                  </svg>
                  <span>Pay</span>
                </span>
                {/* PayPal */}
                <span className="cpb cpb-paypal">
                  <span className="pp-p pp-p--blue">P</span>
                  <span className="pp-p pp-p--light">P</span>
                  <span className="pp-text">ayPal</span>
                </span>
              </div>
            </div>

          </aside>
        </div>
      </div>
    </section>
  );
};

export default Cart;
