import React, { useState } from 'react';
import './SupportPages.css';
import './Contacto.css';

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="support-page contacto-page">
      <div className="support-shell">
        <div className="support-hero contacto-hero">
          <p className="support-kicker">Contacto</p>
          <h1 className="support-title">Hablemos con calma.</h1>
          <p className="support-subtitle">
            Si tienes dudas sobre pedidos, tallas, cambios o cualquier otra consulta, te respondemos con un trato claro y cercano.
          </p>
        </div>

        <div className="support-grid contacto-grid">
          <div className="support-card">
            <h2>Escríbenos</h2>
            <p className="contacto-card-copy">
              Cuanto más detalle nos dejes, mejor podremos ayudarte.
            </p>

            {submitted && (
              <div className="support-success">
                Hemos recibido tu mensaje. Te responderemos lo antes posible.
              </div>
            )}

            <form className="support-form" onSubmit={handleSubmit}>
              <div className="support-form-grid">
                <div className="support-field">
                  <label htmlFor="nombre">Nombre</label>
                  <input className="support-input" type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Tu nombre" required />
                </div>
                <div className="support-field">
                  <label htmlFor="email">Email</label>
                  <input className="support-input" type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="ejemplo@correo.com" required />
                </div>
              </div>

              <div className="support-field">
                <label htmlFor="telefono">Teléfono</label>
                <input className="support-input" type="text" id="telefono" name="telefono" value={formData.telefono} onChange={handleChange} placeholder="Opcional" />
              </div>

              <div className="support-field">
                <label htmlFor="mensaje">Mensaje</label>
                <textarea className="support-textarea" id="mensaje" name="mensaje" value={formData.mensaje} onChange={handleChange} placeholder="Cuéntanos en qué podemos ayudarte" required />
              </div>

              <div className="support-actions">
                <button type="submit" className="support-button">Enviar mensaje</button>
              </div>
            </form>
          </div>

          <aside className="support-card contacto-aside">
            <h3>Canales directos</h3>
            <div className="support-list">
              <div className="support-list-item">
                <div className="support-list-icon">@</div>
                <div>
                  <strong>Correo</strong>
                  <p>help@fashionshop.com</p>
                </div>
              </div>
              <div className="support-list-item">
                <div className="support-list-icon">24</div>
                <div>
                  <strong>Respuesta</strong>
                  <p>Normalmente respondemos en menos de 24 horas laborables.</p>
                </div>
              </div>
              <div className="support-list-item">
                <div className="support-list-icon">HQ</div>
                <div>
                  <strong>Soporte</strong>
                  <p>Pedidos, devoluciones, incidencias de acceso y consultas generales.</p>
                </div>
              </div>
            </div>
            <p className="support-note">También puedes revisar FAQ, envíos y devoluciones antes de escribirnos.</p>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default Contacto;
