import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import authService from './services/auth.service';
import './AuthPages.css';

const heroStyle = {
  backgroundImage: "linear-gradient(180deg, rgba(24,24,24,0.18), rgba(24,24,24,0.62)), url('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80')",
};

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (location.state?.email) {
      setFormData((prev) => ({ ...prev, email: location.state.email }));
    }
  }, [location.state]);

  const validateForm = () => {
    const nextErrors = {};

    if (!formData.nombre.trim()) {
      nextErrors.nombre = 'El nombre es obligatorio.';
    }
    if (!formData.email.trim()) {
      nextErrors.email = 'El email es obligatorio.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      nextErrors.email = 'Introduce un email valido.';
    }
    if (!formData.password) {
      nextErrors.password = 'La contrasena es obligatoria.';
    } else if (formData.password.length < 6) {
      nextErrors.password = 'La contrasena debe tener al menos 6 caracteres.';
    }
    if (!formData.confirmPassword) {
      nextErrors.confirmPassword = 'Confirma tu contrasena.';
    } else if (formData.password !== formData.confirmPassword) {
      nextErrors.confirmPassword = 'Las contrasenas no coinciden.';
    }

    return nextErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setIsLoading(true);
      const { confirmPassword, ...userData } = formData;
      await authService.register(userData);
      navigate('/login');
    } catch (err) {
      setServerError(err.message || 'No hemos podido crear tu cuenta.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (serverError) setServerError('');
  };

  return (
    <section className="auth-page">
      <div className="auth-layout">
        <aside className="auth-aside" style={heroStyle}>
          <div className="auth-aside-copy">
            <p className="auth-kicker">Nueva cuenta</p>
            <h1>Crea tu perfil y guarda tu seleccion.</h1>
            <p>
              Registra tu cuenta para seguir favoritos, completar compras mas rapido y mantener una experiencia coherente en toda la tienda.
            </p>
          </div>
        </aside>

        <div className="auth-panel">
          <p className="auth-kicker">Registro</p>
          <h2>Crear cuenta</h2>
          <p className="auth-panel-intro">
            Completa tus datos y deja listo tu acceso para comprar, guardar prendas y gestionar tu historial.
          </p>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-grid">
              <div className="auth-field">
                <label htmlFor="nombre">Nombre</label>
                <input
                  className={`auth-input ${errors.nombre ? 'is-error' : ''}`}
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Tu nombre"
                />
                {errors.nombre && <span className="auth-field-error">{errors.nombre}</span>}
              </div>

              <div className="auth-field">
                <label htmlFor="email">Email</label>
                <input
                  className={`auth-input ${errors.email ? 'is-error' : ''}`}
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="ejemplo@correo.com"
                />
                {errors.email && <span className="auth-field-error">{errors.email}</span>}
              </div>
            </div>

            <div className="auth-grid">
              <div className="auth-field">
                <label htmlFor="password">Contrasena</label>
                <div className="auth-input-wrap">
                  <input
                    className={`auth-input has-toggle ${errors.password ? 'is-error' : ''}`}
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Minimo 6 caracteres"
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
                {errors.password && <span className="auth-field-error">{errors.password}</span>}
              </div>

              <div className="auth-field">
                <label htmlFor="confirmPassword">Confirmar contrasena</label>
                <div className="auth-input-wrap">
                  <input
                    className={`auth-input has-toggle ${errors.confirmPassword ? 'is-error' : ''}`}
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Repite tu contrasena"
                  />
                  <button type="button" className="auth-toggle" onClick={() => setShowConfirmPassword((value) => !value)}>
                                        {showConfirmPassword ? (
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
                {errors.confirmPassword && <span className="auth-field-error">{errors.confirmPassword}</span>}
              </div>
            </div>

            {serverError && <div className="auth-alert">{serverError}</div>}

            <div className="auth-actions">
              <button type="submit" className="auth-primary" disabled={isLoading}>
                {isLoading ? 'Creando...' : 'Crear cuenta'}
              </button>
              <span className="auth-inline-link">Acceso rapido y visualmente coherente con toda la tienda.</span>
            </div>
          </form>

          <div className="auth-footer">
            <p>
              Ya tienes una cuenta? <Link to="/login" className="auth-text-link">Inicia sesion</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;

