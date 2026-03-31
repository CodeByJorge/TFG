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

            {/* Metodos de pago */}
            <div className="cart-payment-methods">
              <span className="cart-payment-label">Metodos de pago aceptados</span>
              <div className="cart-payment-icons">
                <span className="cart-pay-badge" title="Visa">
                  <svg width="48" height="16" viewBox="0 0 750 471" xmlns="http://www.w3.org/2000/svg">
                    <g fillRule="evenodd">
                      <path d="M278.2 334.2l33.4-207H367l-33.4 207h-55.4zm246.8-201.9c-10.9-4.3-28-8.9-49.4-8.9-54.5 0-92.9 29-93.2 70.6-.3 30.7 27.4 47.8 48.3 58.1 21.5 10.5 28.7 17.2 28.6 26.6-.2 14.4-17.1 20.9-33 20.9-22 0-33.7-3.2-51.9-11.1l-7.1-3.4-7.7 47.7c12.9 5.9 36.7 11.1 61.4 11.4 58 0 95.6-28.6 96-73.1.2-24.4-14.5-42.9-46.4-58.2-19.3-9.9-31.2-16.5-31.1-26.6 0-8.9 10-18.5 31.6-18.5 18.1-.3 31.2 3.9 41.4 8.2l5 2.5 7.5-46.2zm143.4-5.4h-42.6c-13.2 0-23.1 3.8-28.9 17.7l-81.9 195.6h57.9l11.6-32h70.8l6.7 32h51.2l-44.8-213.3zm-68.2 137.5c4.6-12.4 22.1-60 22.1-60-.3.6 4.6-12.5 7.4-20.6l3.8 18.6 12.8 62h-46.1zm-365.3-137.6L183.7 272l-5.8-29.5C167.6 208.6 136.6 172 102.3 154l49.4 180h58.4l86.7-213.3h-61z" fill="#1a1f71"/>
                      <path d="M131.9 126.6H47.7l-.7 4.2c69.2 17.7 115 60.5 134 111.8L162.1 145c-3.2-13.4-13.1-17.7-25.9-21.5" fill="#f9a533"/>
                    </g>
                  </svg>
                </span>
                <span className="cart-pay-badge" title="Mastercard">
                  <svg width="48" height="30" viewBox="0 0 152.407 108" xmlns="http://www.w3.org/2000/svg">
                    <g>
                      <rect fill="none" width="152.407" height="108"/>
                      <g>
                        <rect fill="#ff5f00" x="52.5" y="17.95" width="47.41" height="72.1"/>
                        <path fill="#eb001b" d="M55.76,54a45.78,45.78,0,0,1,17.52-36.05,45.93,45.93,0,1,0,0,72.1A45.78,45.78,0,0,1,55.76,54Z"/>
                        <path fill="#f79e1b" d="M141.14,54a45.94,45.94,0,0,1-74.31,36.05,45.94,45.94,0,0,0,0-72.1A45.94,45.94,0,0,1,141.14,54Z"/>
                      </g>
                    </g>
                  </svg>
                </span>
                <span className="cart-pay-badge" title="American Express">
                  <svg width="48" height="16" viewBox="0 0 750 471" xmlns="http://www.w3.org/2000/svg">
                    <rect fill="#2557D6" width="750" height="471" rx="35"/>
                    <path d="M0 253.14h41.53l9.37-22.52h20.95l9.37 22.52h81.56V235l7.27 18.2h42.2l7.27-18.48v18.48h202.5l-.28-36.65h3.89c2.72.09 3.51.32 3.51 4.84v31.81h104.77V243.5c8.46 5.12 21.67 9.64 39.01 9.64h44.13l9.46-22.52h20.95l9.27 22.52h85.08V231.3l12.9 21.84h68.33V163.6H733.4v17.51l-9.46-17.51h-69.57v17.51l-8.7-17.51H536.06a89.3 89.3 0 0 0-37.78 7.65v-7.65h-64.73v7.65c-7.64-5.78-18.07-7.65-29.36-7.65H193.28l-15.97 36.84-16.34-36.84h-75.13V181.1L76.56 163.6H15.01L0 199.29v53.85zm227.16-16.41h-24.75l-.09-52.95-35.01 52.95h-21.23l-35.1-53.04v53.04H75.66l-9.37-22.61H19.32l-9.46 22.61H-2.95l43.65-73.14h35.57l41.43 69.24v-69.24h39.2l31.6 45.87 29.07-45.87h39.58v73.14zm-200.4-36.65l-16.25-39.01-16.25 39h32.5zm227.97 36.65h-80.42v-73.14h80.42v15.69h-56.07v12.44h54.73v15.41h-54.73v14h56.07v15.6zm115.5-53.6c0 22.9-15.22 27.57-30.49 27.57h-30.44l-.09 26.03h-47.45L263.6 211.2l-27.88 25.93h-96.35v-73.14h97.77l24.19 25.37 25.26-25.37h78.67c13.18 0 27.97 3.64 27.97 24.48zm-185.09 38.04l-30.79-31.83 30.79-30.52v62.35zM248.83 206l-34.63 32.41H157.4l50.4-48.23-50.4-47.09H215l34.34 32.09-34.72 30.81h34.21zm61.97 4.13h-31.67v-25.08h32.05c8.89 0 15.09 3.62 15.09 12.16 0 8.42-5.74 12.92-15.47 12.92zm128.28 26.6h-27.07l-.09-73.14h27.07c14.42 0 24.47 1.42 31.87 7.32 6.91 5.35 11.46 14.1 11.46 27.81 0 25.4-15.59 38.01-43.24 38.01zm12.75-53.88c-4.67-3.56-10.32-4.85-18.63-4.85h-12.94v46.32h12.94c8.31 0 13.55-.9 18.63-5.02 4.25-3.49 7.27-10.1 7.27-18.04 0-7.93-3.02-15.04-7.27-18.41zm109.47 53.88h-80.47v-73.14h80.47v15.69H505.2v12.44h54.73v15.41H505.2v14h56.1v15.6zm-459.05 89.77h-82.15l-41.44-53.33L-27.08 280h60.55v-53.33h-60.55v53.33zM-45 305.8l-42.44 47.7h-47.18v-53.33h-63.96v53.33h-63.96V280h97.75l24.22 25.37 25.24-25.37h120.04c13.66 0 27.43 3.87 27.43 24.67 0 22.95-15.59 27.2-30.22 27.2l-.38-26.07z" fill="#fff" transform="translate(249.36,0)"/>
                  </svg>
                </span>
                <span className="cart-pay-badge" title="PayPal">
                  <svg width="48" height="14" viewBox="0 0 780 500" xmlns="http://www.w3.org/2000/svg">
                    <path d="M168.38 169.35c-8.4-5.76-20.04-8.64-34.92-8.64H88.64c-5.28 0-7.8 2.64-7.56 7.92l-18.36 116.4c-.24 1.44.12 2.76 1.08 3.96.96 1.2 2.16 1.8 3.6 1.8h24.48l7.56-46.08-.24 1.44c.48-5.28 3-7.92 7.56-7.92h16.56c21.84 0 38.88-8.88 51.12-26.64 3.36-5.28 5.76-10.68 7.2-16.2.24-.72.36-1.44.48-2.16-.96-.48-.96-.48 0 0-2.4-13.44-9.72-20.52-23.64-23.88z" fill="#27346a"/>
                    <path d="M173.18 193.35c-.12.72-.24 1.44-.48 2.16-7.68 32.16-27.84 48.24-60.48 48.24h-16.56c-4.56 0-7.08 2.64-7.56 7.92L82.94 294c-.24 1.44.12 2.64.96 3.6.96 1.08 2.16 1.56 3.6 1.56h21.72c4.56 0 7.2-2.52 7.92-7.56l6.84-38.88c.72-5.04 3.36-7.56 7.92-7.56h5.04c22.08 0 39.24-8.88 51.48-26.64 6-9.12 9.72-19.2 11.16-30.24-7.44-3.36-13.2-4.2-26.4 5.07z" fill="#2790c3"/>
                    <path d="M93.08 193.35c.48-2.88 1.92-5.28 4.32-7.2 2.4-1.92 5.04-2.88 7.92-2.88h44.88c5.28 0 10.2.36 14.76 1.08 1.68.24 3.36.6 5.04 1.08 1.68.48 3.36.96 5.04 1.56 1.2.36 2.28.84 3.24 1.32 2.88-18.24-.12-30.72-9.36-41.88-10.2-12.36-28.56-18.48-55.08-18.48h-54.6c-4.56 0-7.32 2.64-8.28 7.92L32.18 290.6c-.48 2.16.12 4.08 1.56 5.76 1.56 1.68 3.36 2.52 5.4 2.52h31.32l12.6-80.28 10.02-25.25z" fill="#1f264f"/>
                    <path d="M498.68 169.35c-8.4-5.76-20.04-8.64-34.92-8.64h-44.88c-5.28 0-7.8 2.64-7.56 7.92L393 285c-.24 1.44.12 2.76 1.08 3.96.96 1.2 2.16 1.8 3.6 1.8h26.16c3.6 0 6-2.16 7.2-6.48l7.2-41.28-.24 1.44c.48-5.28 3-7.92 7.56-7.92h16.56c21.84 0 38.88-8.88 51.12-26.64 3.36-5.28 5.76-10.68 7.2-16.2.24-.72.36-1.44.48-2.16-.96-.48-.96-.48 0 0-2.4-13.44-9.72-20.52-23.64-23.88l1.4 1.71z" fill="#27346a"/>
                    <path d="M503.48 193.35c-.12.72-.24 1.44-.48 2.16-7.68 32.16-27.84 48.24-60.48 48.24h-16.56c-4.56 0-7.08 2.64-7.56 7.92l-6.12 42.84c-.24 1.2.12 2.28.84 3.24.84.96 1.8 1.44 2.88 1.44h22.32c4.56 0 7.2-2.52 7.92-7.56l6.6-36.96c.72-5.04 3.36-7.56 7.92-7.56h5.04c22.08 0 39.24-8.88 51.48-26.64 6-9.12 9.72-19.2 11.16-30.24-7.44-3.36-13.2-4.2-24.96 3.12z" fill="#2790c3"/>
                    <path d="M423.38 193.35c.48-2.88 1.92-5.28 4.32-7.2 2.4-1.92 5.04-2.88 7.92-2.88h44.88c5.28 0 10.2.36 14.76 1.08 1.68.24 3.36.6 5.04 1.08 1.68.48 3.36.96 5.04 1.56 1.2.36 2.28.84 3.24 1.32 2.88-18.24-.12-30.72-9.36-41.88-10.2-12.36-28.56-18.48-55.08-18.48h-54.72c-4.56 0-7.32 2.64-8.28 7.92l-18.6 155.76c-.48 2.16.12 4.08 1.56 5.76 1.56 1.68 3.36 2.52 5.4 2.52h31.32l12.6-80.28 9.96-26.28z" fill="#1f264f"/>
                    <path d="M312.38 256.2h-24.96c-3.12 0-5.16-2.04-6.12-6.12l-.72-3.12c-5.76 6.96-14.04 10.44-24.84 10.44-12.12 0-22.2-4.44-30.24-13.32-8.04-8.88-12.06-19.68-12.06-32.4s4.2-23.4 12.6-32.04c8.4-8.64 18.66-12.96 30.78-12.96 10.56 0 18.72 3.6 24.48 10.8l.72-3.96c.72-4.08 3-6.12 6.84-6.12h19.32c4.08 0 5.88 2.04 5.4 6.12L306 250.08c-.48 4.08-2.52 6.12-6.12 6.12h12.5zm-44.52-24.12c5.52 0 10.2-2.04 14.04-6.12 3.84-4.08 5.76-9.12 5.76-15.12s-1.92-10.92-5.76-14.76c-3.84-3.84-8.52-5.76-14.04-5.76-5.76 0-10.56 1.92-14.4 5.76-3.84 3.84-5.76 8.76-5.76 14.76s1.92 11.04 5.76 15.12c3.84 4.08 8.64 6.12 14.4 6.12z" fill="#27346a"/>
                    <path d="M600.78 256.2h-19.92c-3.12 0-5.16-2.04-6.12-6.12l-.72-3.12c-5.76 6.96-14.04 10.44-24.84 10.44-12.12 0-22.2-4.44-30.24-13.32-8.04-8.88-12.06-19.68-12.06-32.4s4.2-23.4 12.6-32.04c8.4-8.64 18.66-12.96 30.78-12.96 10.56 0 18.72 3.6 24.48 10.8l.72-3.96c.72-4.08 3-6.12 6.84-6.12h19.32c4.08 0 5.88 2.04 5.4 6.12l-12.12 76.56c-.48 4.08-2.52 6.12-6.12 6.12h12z" fill="#27346a"/>
                    <path d="M556.26 232.08c5.52 0 10.2-2.04 14.04-6.12 3.84-4.08 5.76-9.12 5.76-15.12s-1.92-10.92-5.76-14.76c-3.84-3.84-8.52-5.76-14.04-5.76-5.76 0-10.56 1.92-14.4 5.76-3.84 3.84-5.76 8.76-5.76 14.76s1.92 11.04 5.76 15.12c3.84 4.08 8.64 6.12 14.4 6.12z" fill="#27346a"/>
                    <path d="M667.74 256.2H647.7c-4.08 0-5.88-2.04-5.4-6.12l18.6-116.4c.72-4.08 2.88-6.12 6.48-6.12h19.92c4.08 0 5.88 2.04 5.4 6.12l-18.48 116.4c-.72 4.08-2.76 6.12-6.48 6.12z" fill="#27346a"/>
                  </svg>
                </span>
                <span className="cart-pay-badge cart-pay-badge--apple" title="Apple Pay">
                  <svg width="48" height="20" viewBox="0 0 165.52 105.97" xmlns="http://www.w3.org/2000/svg">
                    <path d="M150.7 0H14.82A14.83 14.83 0 0 0 0 14.82V91.2a14.83 14.83 0 0 0 14.82 14.82H150.7a14.83 14.83 0 0 0 14.82-14.82V14.82A14.83 14.83 0 0 0 150.7 0z" fill="#000"/>
                    <path d="M43.08 35.7a8.28 8.28 0 0 0 1.9-5.93 8.45 8.45 0 0 0-5.56 2.88 7.92 7.92 0 0 0-1.98 5.76 7 7 0 0 0 5.64-2.71zM44.95 38.76c-3.12-.18-5.78 1.77-7.26 1.77s-3.77-1.68-6.21-1.64a9.2 9.2 0 0 0-7.8 4.72c-3.33 5.78-.86 14.35 2.38 19.06 1.58 2.3 3.47 4.9 5.95 4.8 2.39-.1 3.29-1.54 6.16-1.54s3.69 1.54 6.21 1.49c2.57-.05 4.2-2.35 5.78-4.66a19.54 19.54 0 0 0 2.62-5.38 8.64 8.64 0 0 1-5.2-7.92 8.8 8.8 0 0 1 4.2-7.38 9.03 9.03 0 0 0-7.12-3.32h.29z" fill="#fff"/>
                    <path d="M70.1 31.62h8.73c6.02 0 10.22 4.14 10.22 10.22S84.9 52.11 78.83 52.11h-5.7v10.82H70.1zm3.03 17.7h5c4.2 0 7.3-2.85 7.3-7.48s-3.1-7.43-7.24-7.43h-5.06zm18.83 8.1c0-4.14 3.16-6.67 8.77-6.97l6.44-.35V48.6c0-2.95-1.98-4.72-5.3-4.72a5.1 5.1 0 0 0-5.34 3.77h-2.76c.2-3.67 3.47-6.29 8.2-6.29 4.82 0 7.99 2.57 7.99 6.58v13.59h-2.85v-3.63h-.1a7.6 7.6 0 0 1-6.81 3.96c-4.25 0-8.24-2.6-8.24-6.24zm15.21-2.08v-1.69l-5.8.35c-3.86.25-6.04 1.84-6.04 4.4 0 2.6 2.27 4.35 5.24 4.35 3.87 0 6.6-2.66 6.6-5.17v-2.24zm11.37 12.36v-2.46c.25.05.8.05 1.09.05 2.17 0 3.37-.94 4.1-3.3l.44-1.4-8.23-21.36h3.07l6.67 18.65h.1l6.67-18.65h2.96l-8.53 22.26c-1.94 5.15-4.15 6.81-8.82 6.81-.25 0-1.04-.05-1.74-.1h.22z" fill="#fff"/>
                  </svg>
                </span>
              </div>
            </div>

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
