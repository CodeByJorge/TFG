import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AuthPages.css';

const heroStyle = {
  backgroundImage: "linear-gradient(180deg, rgba(24,24,24,0.18), rgba(24,24,24,0.62)), url('https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80')",
};

const RecuperarContrasena = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Introduce tu correo electronico para continuar.');
      return;
    }
    setSubmitted(true);
    setError('');
  };

  return (
    <section className="auth-page">
      <div className="auth-layout">
        <aside className="auth-aside" style={heroStyle}>
          <div className="auth-aside-copy">
            <p className="auth-kicker">Recuperacion</p>
            <h1>Recupera el acceso a tu cuenta.</h1>
            <p>
              Te enviaremos un enlace para volver a entrar y seguir con tu seleccion guardada.
            </p>
          </div>
        </aside>

        <div className="auth-panel">
          <p className="auth-kicker">Soporte</p>
          <h2>Recuperar contrasena</h2>
          <p className="auth-panel-intro">
            Introduce tu email y prepararemos el siguiente paso para que puedas restablecer el acceso.
          </p>

          {submitted ? (
            <div className="auth-success">
              <p className="auth-panel-intro">
                Hemos preparado el envio del enlace de recuperacion a <strong>{email}</strong>.
              </p>
              <Link to="/login" className="auth-primary">Volver al login</Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="auth-field">
                <label htmlFor="email">Correo electronico</label>
                <input
                  className="auth-input"
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ejemplo@correo.com"
                  required
                />
              </div>

              {error && <div className="auth-alert">{error}</div>}

              <div className="auth-actions">
                <button type="submit" className="auth-primary">Enviar enlace</button>
                <Link to="/login" className="auth-inline-link">Volver al login</Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default RecuperarContrasena;
