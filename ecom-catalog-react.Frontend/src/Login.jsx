import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import './AuthPages.css';

const heroStyle = {
  backgroundImage: "linear-gradient(180deg, rgba(24,24,24,0.18), rgba(24,24,24,0.62)), url('https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80')",
};

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(formData.email, formData.password);
      navigate('/');
    } catch (err) {
      if (err.message.includes('Credenciales invalidas')) {
        navigate('/registro', { state: { email: formData.email } });
      } else {
        setError('No hemos podido iniciar sesión. Revisa tus datos e inténtalo de nuevo.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  return (
    <section className="auth-page">
      <div className="auth-layout">
        <aside className="auth-aside" style={heroStyle}>
          <div className="auth-aside-copy">
            <p className="auth-kicker">Fashion Minimal</p>
            <h1>Vuelve a entrar en tu espacio.</h1>
            <p>
              Recupera tus favoritos, revisa el carrito y sigue comprando con la misma experiencia limpia que en el resto de la tienda.
            </p>
          </div>
        </aside>

        <div className="auth-panel">
          <p className="auth-kicker">Acceso</p>
          <h2>Iniciar sesión</h2>
          <p className="auth-panel-intro">
            Accede a tu cuenta para guardar prendas, gestionar pedidos y mantener tus favoritos y tu carrito siempre a mano.
          </p>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-field">
              <label htmlFor="email">Email</label>
              <input
                className="auth-input"
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="ejemplo@correo.com"
              />
            </div>

            <div className="auth-field">
              <label htmlFor="password">Contraseña</label>
              <div className="auth-input-wrap">
                <input
                  className="auth-input has-toggle"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Escribe tu contraseña"
                />
                <button type="button" className="auth-toggle" onClick={() => setShowPassword((value) => !value)}>
                                    {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M2 12s3.8-7 10-7 10 7 10 7-3.8 7-10 7-10-7-10-7Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M3 3l18 18" />
                      <path d="M10.6 10.7a3 3 0 0 0 4 4" />
                      <path d="M9.9 5.2A10.5 10.5 0 0 1 12 5c6.2 0 10 7 10 7a18.7 18.7 0 0 1-3.1 4.1" />
                      <path d="M6.7 6.8A18.2 18.2 0 0 0 2 12s3.8 7 10 7a10 10 0 0 0 4.2-.9" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {error && <div className="auth-alert">{error}</div>}

            <div className="auth-actions">
              <button type="submit" className="auth-primary" disabled={isLoading}>
                {isLoading ? 'Entrando...' : 'Entrar'}
              </button>
              <Link to="/recuperar-contrasena" className="auth-inline-link">
                Has olvidado tu contraseña?
              </Link>
            </div>
          </form>

          <div className="auth-footer">
            <p>
              Aún no tienes cuenta? <Link to="/registro" className="auth-text-link">Crear una ahora</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;

