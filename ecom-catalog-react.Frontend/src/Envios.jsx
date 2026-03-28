import React, { useState } from 'react';
import './SupportPages.css';
import './Envios.css';

const Envios = () => {
  const [searchType, setSearchType] = useState('email');
  const [email, setEmail] = useState('');
  const [codigoPostal, setCodigoPostal] = useState('');
  const [pedido, setPedido] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setMessage(`Hemos localizado la consulta para ${email} con el código postal ${codigoPostal}.`);
  };

  const handlePedidoSubmit = (e) => {
    e.preventDefault();
    setMessage(`Hemos preparado la búsqueda del pedido ${pedido}.`);
  };

  return (
    <section className="support-page envios-page">
      <div className="support-shell">
        <div className="support-hero envios-hero">
          <p className="support-kicker">Envíos</p>
          <h1 className="support-title">Sigue tu pedido en pocos pasos.</h1>
          <p className="support-subtitle">
            Consulta el estado de tu envío y revisa los plazos habituales de entrega de forma rápida y sencilla.
          </p>
        </div>

        <div className="support-grid envios-grid">
          <div className="support-card">
            <div className="envios-toggle-row">
              <button className={`support-toggle ${searchType === 'email' ? 'is-active' : ''}`} type="button" onClick={() => setSearchType('email')}>
                Email y código postal
              </button>
              <button className={`support-toggle ${searchType === 'pedido' ? 'is-active' : ''}`} type="button" onClick={() => setSearchType('pedido')}>
                Número de pedido
              </button>
            </div>

            {message && <div className="support-success">{message}</div>}

            {searchType === 'email' ? (
              <form onSubmit={handleEmailSubmit} className="support-form">
                <div className="support-field">
                  <label htmlFor="email">Correo electrónico</label>
                  <input
                    className="support-input"
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ejemplo@correo.com"
                    required
                  />
                </div>
                <div className="support-field">
                  <label htmlFor="codigoPostal">Código postal</label>
                  <input
                    className="support-input"
                    type="text"
                    id="codigoPostal"
                    value={codigoPostal}
                    onChange={(e) => setCodigoPostal(e.target.value)}
                    placeholder="5 dígitos"
                    pattern="[0-9]{5}"
                    maxLength="5"
                    required
                  />
                </div>
                <div className="support-actions">
                  <button type="submit" className="support-button">Buscar envío</button>
                </div>
              </form>
            ) : (
              <form onSubmit={handlePedidoSubmit} className="support-form">
                <div className="support-field">
                  <label htmlFor="pedido">Número de pedido</label>
                  <input
                    className="support-input"
                    type="text"
                    id="pedido"
                    value={pedido}
                    onChange={(e) => setPedido(e.target.value)}
                    placeholder="Ej. FM-2026-0142"
                    required
                  />
                </div>
                <div className="support-actions">
                  <button type="submit" className="support-button">Buscar pedido</button>
                </div>
              </form>
            )}
          </div>

          <aside className="support-card envios-aside">
            <h3>Información útil</h3>
            <div className="support-list">
              <div className="support-list-item">
                <div className="support-list-icon">48h</div>
                <div>
                  <strong>Preparación</strong>
                  <p>Los pedidos suelen prepararse entre 24 y 48 horas laborables.</p>
                </div>
              </div>
              <div className="support-list-item">
                <div className="support-list-icon">ES</div>
                <div>
                  <strong>Envío nacional</strong>
                  <p>Entre 2 y 5 días hábiles, según el destino.</p>
                </div>
              </div>
              <div className="support-list-item">
                <div className="support-list-icon">INT</div>
                <div>
                  <strong>Envío internacional</strong>
                  <p>Entre 7 y 15 días hábiles, con seguimiento incluido.</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default Envios;

