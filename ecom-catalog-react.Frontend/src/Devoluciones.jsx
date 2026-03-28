import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SupportPages.css';
import './Devoluciones.css';

const Devoluciones = () => {
  const [pedido, setPedido] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!pedido || !email) {
      setError('Completa los dos campos para continuar.');
      setSuccess('');
      return;
    }
    setError('');
    setSuccess(`Hemos preparado tu solicitud para el pedido ${pedido}.`);
  };

  return (
    <section className="support-page devoluciones-page">
      <div className="support-shell">
        <div className="support-hero devoluciones-hero">
          <p className="support-kicker">Cambios y devoluciones</p>
          <h1 className="support-title">Gestiona tu devolución de forma sencilla.</h1>
          <p className="support-subtitle">
            Inicia el proceso con los datos de tu pedido y revisa en un momento las condiciones principales.
          </p>
          <div className="support-actions">
            <Link to="/" className="support-link-button is-dark">Ir al inicio</Link>
            <Link to="/contacto" className="support-link-button">Necesito ayuda</Link>
          </div>
        </div>

        <div className="support-grid devoluciones-grid">
          <div className="support-card">
            <h2>Buscar pedido</h2>
            <p className="support-note">Necesitamos tu número de pedido y el correo asociado a la compra.</p>

            <form className="support-form" onSubmit={handleSubmit}>
              <div className="support-field">
                <label htmlFor="pedido">Número de pedido</label>
                <input className="support-input" type="text" id="pedido" placeholder="Ej. FM-2026-0142" value={pedido} onChange={(e) => setPedido(e.target.value)} />
              </div>
              <div className="support-field">
                <label htmlFor="email">Email</label>
                <input className="support-input" type="email" id="email" placeholder="ejemplo@correo.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>

              {error && <div className="support-alert">{error}</div>}
              {success && <div className="support-success">{success}</div>}

              <div className="support-actions">
                <button type="submit" className="support-button">Continuar</button>
                <Link to="/contacto" className="support-link-button">Contactar con soporte</Link>
              </div>
            </form>
          </div>

          <aside className="support-card devoluciones-aside">
            <h3>Condiciones</h3>
            <div className="support-list">
              <div className="support-list-item">
                <div className="support-list-icon">14d</div>
                <div>
                  <strong>Plazo</strong>
                  <p>Puedes solicitar cambios o devoluciones dentro de los 14 días posteriores a la entrega.</p>
                </div>
              </div>
              <div className="support-list-item">
                <div className="support-list-icon">OK</div>
                <div>
                  <strong>Estado</strong>
                  <p>La prenda debe conservar su etiqueta, su embalaje y no presentar signos de uso.</p>
                </div>
              </div>
              <div className="support-list-item">
                <div className="support-list-icon">INFO</div>
                <div>
                  <strong>Ayuda</strong>
                  <p>Si tu pedido tiene una incidencia, escríbenos antes para ayudarte a resolverlo más rápido.</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default Devoluciones;
