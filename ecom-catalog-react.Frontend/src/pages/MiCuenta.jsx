import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import config from '../config';

const styles = {
  page: {
    maxWidth: '640px',
    margin: '3rem auto',
    padding: '0 1.5rem',
    fontFamily: "'Inter Tight', Inter, system-ui, sans-serif",
    color: '#1a1a1a',
  },
  heading: {
    fontSize: '1.6rem',
    fontWeight: 600,
    marginBottom: '0.5rem',
  },
  subtitle: {
    fontSize: '0.85rem',
    color: '#888',
    marginBottom: '2.5rem',
  },
  section: {
    background: '#fff',
    border: '1px solid rgba(24,24,24,0.1)',
    borderRadius: '12px',
    padding: '1.5rem',
    marginBottom: '1.5rem',
  },
  sectionTitle: {
    fontSize: '0.72rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: '#6f6a63',
    marginBottom: '1rem',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.3rem',
    marginBottom: '1rem',
  },
  label: {
    fontSize: '0.78rem',
    fontWeight: 600,
    color: '#6f6a63',
  },
  input: {
    padding: '0.55rem 0.75rem',
    border: '1px solid rgba(24,24,24,0.12)',
    borderRadius: '8px',
    fontSize: '0.875rem',
    outline: 'none',
    fontFamily: 'inherit',
  },
  btn: {
    background: '#1a1a1a',
    color: '#fff',
    border: 'none',
    padding: '0.6rem 1.5rem',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: 500,
    marginTop: '0.5rem',
  },
  info: {
    fontSize: '0.875rem',
    padding: '0.4rem 0',
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px solid rgba(24,24,24,0.06)',
  },
  msg: (type) => ({
    padding: '0.6rem 1rem',
    borderRadius: '8px',
    fontSize: '0.85rem',
    marginBottom: '1rem',
    background: type === 'error' ? '#f8d7da' : '#d1e7dd',
    color: type === 'error' ? '#842029' : '#0f5132',
  }),
};

const MiCuenta = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [emailForm, setEmailForm] = useState({ emailNuevo: '', password: '' });
  const [passForm, setPassForm] = useState({ passwordActual: '', passwordNueva: '', confirmar: '' });
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!user?.token) navigate('/login');
  }, [user, navigate]);

  if (!user) return null;

  const showMsg = (text, type = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 4000);
  };

  const handleChangeEmail = async (e) => {
    e.preventDefault();
    if (!emailForm.emailNuevo || !emailForm.password) {
      return showMsg('Completa todos los campos', 'error');
    }
    if (!/\S+@\S+\.\S+/.test(emailForm.emailNuevo)) {
      return showMsg('Formato de email no válido', 'error');
    }
    try {
      const res = await fetch(`${config.USERS_URL}/${user.id}/email`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.token}` },
        body: JSON.stringify(emailForm),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al cambiar email');
      showMsg('Email actualizado correctamente. Vuelve a iniciar sesión.');
      setEmailForm({ emailNuevo: '', password: '' });
      setTimeout(() => { logout(); navigate('/login'); }, 2000);
    } catch (err) {
      showMsg(err.message, 'error');
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!passForm.passwordActual || !passForm.passwordNueva || !passForm.confirmar) {
      return showMsg('Completa todos los campos', 'error');
    }
    if (passForm.passwordNueva.length < 6) {
      return showMsg('La nueva contraseña debe tener al menos 6 caracteres', 'error');
    }
    if (passForm.passwordNueva !== passForm.confirmar) {
      return showMsg('Las contraseñas no coinciden', 'error');
    }
    try {
      const res = await fetch(`${config.USERS_URL}/${user.id}/password`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.token}` },
        body: JSON.stringify({ passwordActual: passForm.passwordActual, passwordNueva: passForm.passwordNueva }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al cambiar contraseña');
      showMsg('Contraseña actualizada correctamente');
      setPassForm({ passwordActual: '', passwordNueva: '', confirmar: '' });
    } catch (err) {
      showMsg(err.message, 'error');
    }
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>Mi cuenta</h1>
      <p style={styles.subtitle}>Gestiona tu información personal</p>

      {message && <div style={styles.msg(message.type)}>{message.text}</div>}

      <div style={styles.section}>
        <p style={styles.sectionTitle}>Información personal</p>
        <div style={styles.info}><span>Nombre</span><span>{user.nombre}</span></div>
        <div style={styles.info}><span>Email</span><span>{user.email}</span></div>
        <div style={{ ...styles.info, borderBottom: 'none' }}><span>Rol</span><span>{user.rol}</span></div>
      </div>

      <div style={styles.section}>
        <p style={styles.sectionTitle}>Cambiar email</p>
        <form onSubmit={handleChangeEmail}>
          <div style={styles.field}>
            <label style={styles.label}>Nuevo email</label>
            <input
              style={styles.input}
              type="email"
              value={emailForm.emailNuevo}
              onChange={(e) => setEmailForm({ ...emailForm, emailNuevo: e.target.value })}
              placeholder="nuevo@email.com"
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Contraseña actual</label>
            <input
              style={styles.input}
              type="password"
              value={emailForm.password}
              onChange={(e) => setEmailForm({ ...emailForm, password: e.target.value })}
              placeholder="Confirma tu contraseña"
            />
          </div>
          <button type="submit" style={styles.btn}>Actualizar email</button>
        </form>
      </div>

      <div style={styles.section}>
        <p style={styles.sectionTitle}>Cambiar contraseña</p>
        <form onSubmit={handleChangePassword}>
          <div style={styles.field}>
            <label style={styles.label}>Contraseña actual</label>
            <input
              style={styles.input}
              type="password"
              value={passForm.passwordActual}
              onChange={(e) => setPassForm({ ...passForm, passwordActual: e.target.value })}
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Nueva contraseña</label>
            <input
              style={styles.input}
              type="password"
              value={passForm.passwordNueva}
              onChange={(e) => setPassForm({ ...passForm, passwordNueva: e.target.value })}
              placeholder="Mínimo 6 caracteres"
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Confirmar nueva contraseña</label>
            <input
              style={styles.input}
              type="password"
              value={passForm.confirmar}
              onChange={(e) => setPassForm({ ...passForm, confirmar: e.target.value })}
            />
          </div>
          <button type="submit" style={styles.btn}>Actualizar contraseña</button>
        </form>
      </div>
    </div>
  );
};

export default MiCuenta;
