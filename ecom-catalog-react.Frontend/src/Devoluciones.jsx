import React, { useState } from 'react';
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
    setSuccess(`Solicitud preparada para el pedido ${pedido}.`);
  };

  return (
    <section className="support-page devoluciones-page">
      <div className="support-shell">
        <div className="support-hero devoluciones-hero">
          <p className="support-kicker">Cambios y devoluciones</p>
          <h1 className="support-title">Gestiona tu devolucion sin friccion.</h1>
          <p className="support-subtitle">
            Inicia el proceso con los datos de tu pedido original y consulta en un vistazo las condiciones principales.
          </p>
        </div>

        <div className="support-grid devoluciones-grid">
          <div className="support-card">
            <h2>Buscar pedido</h2>
            <p className="support-note">Necesitamos tu numero de pedido y el correo asociado a la compra.</p>

            <form className="support-form" onSubmit={handleSubmit}>
              <div className="support-field">
                <label htmlFor="pedido">Numero de pedido</label>
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
                  <p>Puedes solicitar cambios o devoluciones dentro de los 14 dias posteriores a la entrega.</p>
                </div>
              </div>
              <div className="support-list-item">
                <div className="support-list-icon">OK</div>
                <div>
                  <strong>Estado</strong>
                  <p>La prenda debe conservar etiqueta, embalaje y no presentar uso.</p>
                </div>
              </div>
              <div className="support-list-item">
                <div className="support-list-icon">INFO</div>
                <div>
                  <strong>Ayuda</strong>
                  <p>Si tu pedido presenta una incidencia, contacta antes con soporte para agilizar el proceso.</p>
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
