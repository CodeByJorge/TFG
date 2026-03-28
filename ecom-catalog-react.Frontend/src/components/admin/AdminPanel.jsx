import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './AdminPanel.css';

const API = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000';
const ESTADOS_PEDIDO = ['PENDIENTE', 'CONFIRMADO', 'ENVIADO', 'ENTREGADO', 'CANCELADO'];
const TALLAS_DISPONIBLES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '34', '36', '38', '40', '42', '44', '46'];

function authHeaders() {
  try {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return { Authorization: `Bearer ${user?.token}`, 'Content-Type': 'application/json' };
  } catch {
    return { 'Content-Type': 'application/json' };
  }
}

// ── Subcomponents ────────────────────────────────────────

function KpiCard({ label, value }) {
  return (
    <div className="adm-kpi">
      <span className="adm-kpi-label">{label}</span>
      <span className="adm-kpi-value">{value}</span>
    </div>
  );
}

function Modal({ title, onClose, onSave, children }) {
  return (
    <div className="adm-overlay" onClick={onClose}>
      <div className="adm-modal" onClick={e => e.stopPropagation()}>
        <div className="adm-modal-header">
          <h3>{title}</h3>
          <button className="adm-close" onClick={onClose}>✕</button>
        </div>
        <div className="adm-modal-body">{children}</div>
        <div className="adm-modal-footer">
          <button className="adm-btn-secondary" onClick={onClose}>Cancelar</button>
          <button className="adm-btn-primary" onClick={onSave}>Guardar</button>
        </div>
      </div>
    </div>
  );
}

// ── Main component ───────────────────────────────────────

const AdminPanel = () => {
  const [tab, setTab] = useState('resumen');

  const [stats, setStats] = useState(null);
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  const [filtroEstado, setFiltroEstado] = useState('');
  const [modal, setModal] = useState(null); // { type, mode, data }
  const [form, setForm] = useState({});
  const [toast, setToast] = useState('');
  const [productoTallas, setProductoTallas] = useState([]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  // ── Data loading ──────────────────────────────────────

  useEffect(() => {
    if (tab === 'resumen')   fetchStats();
    if (tab === 'productos') { fetchProductos(); fetchCategorias(); }
    if (tab === 'pedidos')   fetchPedidos();
    if (tab === 'usuarios')  fetchUsuarios();
  }, [tab]);

  useEffect(() => {
    if (tab === 'pedidos') fetchPedidos();
  }, [filtroEstado]);

  async function fetchStats() {
    try {
      const { data } = await axios.get(`${API}/api/admin/dashboard/stats`, { headers: authHeaders() });
      setStats(data);
    } catch {
      showToast('Error al cargar estadísticas');
    }
  }

  async function fetchProductos() {
    try {
      const { data } = await axios.get(`${API}/api/productos`, { headers: authHeaders() });
      setProductos(data);
    } catch {
      showToast('Error al cargar productos');
    }
  }

  async function fetchCategorias() {
    try {
      const { data } = await axios.get(`${API}/api/public/categoria`, { headers: authHeaders() });
      setCategorias(data);
    } catch {
      showToast('Error al cargar categorías');
    }
  }

  async function fetchPedidos() {
    try {
      const url = filtroEstado
        ? `${API}/api/pedidos/estado/${filtroEstado}`
        : `${API}/api/pedidos`;
      const { data } = await axios.get(url, { headers: authHeaders() });
      setPedidos(data);
    } catch {
      showToast('Error al cargar pedidos');
    }
  }

  async function fetchUsuarios() {
    try {
      const { data } = await axios.get(`${API}/api/usuarios`, { headers: authHeaders() });
      setUsuarios(data);
    } catch {
      showToast('Error al cargar usuarios');
    }
  }

  // ── Product CRUD ──────────────────────────────────────

  async function openProductoModal(mode, data = {}) {
    setForm(mode === 'edit' ? {
      nombre: data.nombre || '',
      descripcion: data.descripcion || '',
      imagenUrl: data.imagenUrl || '',
      precio: data.precio ?? '',
      categoriaId: data.categoria?.id ?? '',
      stock: data.stock ?? 10
    } : { nombre: '', descripcion: '', imagenUrl: '', precio: '', categoriaId: '', stock: 10 });

    if (mode === 'edit' && data.id) {
      try {
        const { data: prod } = await axios.get(`${API}/api/productos/${data.id}`, { headers: authHeaders() });
        setProductoTallas(prod.tallas ? [...prod.tallas].sort((a, b) => a.nombre.localeCompare(b.nombre)) : []);
      } catch {
        setProductoTallas([]);
      }
    } else {
      setProductoTallas([]);
    }

    setModal({ type: 'producto', mode, data });
  }

  async function addTallaProducto(tallaNombre) {
    try {
      const { data } = await axios.post(
        `${API}/api/productos/${modal.data.id}/tallas?talla=${encodeURIComponent(tallaNombre)}`,
        {},
        { headers: authHeaders() }
      );
      setProductoTallas(data.tallas ? [...data.tallas].sort((a, b) => a.nombre.localeCompare(b.nombre)) : []);
    } catch {
      showToast('Error al añadir talla');
    }
  }

  async function removeTallaProducto(tallaNombre) {
    try {
      const { data } = await axios.delete(
        `${API}/api/productos/${modal.data.id}/tallas?talla=${encodeURIComponent(tallaNombre)}`,
        { headers: authHeaders() }
      );
      setProductoTallas(data.tallas ? [...data.tallas].sort((a, b) => a.nombre.localeCompare(b.nombre)) : []);
    } catch {
      showToast('Error al eliminar talla');
    }
  }

  async function saveProducto() {
    const payload = {
      nombre: form.nombre,
      descripcion: form.descripcion,
      imagenUrl: form.imagenUrl,
      precio: parseFloat(form.precio),
      stock: parseInt(form.stock) || 0,
      categoria: { id: parseInt(form.categoriaId) }
    };
    try {
      if (modal.mode === 'edit') {
        await axios.put(`${API}/api/productos/${modal.data.id}`, payload, { headers: authHeaders() });
      } else {
        await axios.post(`${API}/api/productos`, payload, { headers: authHeaders() });
      }
      setModal(null);
      fetchProductos();
      showToast('Producto guardado correctamente');
    } catch {
      showToast('Error al guardar el producto');
    }
  }

  async function deleteProducto(id) {
    if (!window.confirm('¿Eliminar este producto?')) return;
    try {
      await axios.delete(`${API}/api/productos/${id}`, { headers: authHeaders() });
      fetchProductos();
      showToast('Producto eliminado');
    } catch {
      showToast('Error al eliminar el producto');
    }
  }

  // ── Order state ───────────────────────────────────────

  async function cambiarEstadoPedido(pedidoId, nuevoEstado) {
    try {
      await axios.put(
        `${API}/api/pedidos/${pedidoId}/estado?nuevoEstado=${nuevoEstado}`,
        {},
        { headers: authHeaders() }
      );
      fetchPedidos();
    } catch {
      showToast('Error al actualizar el estado del pedido');
    }
  }

  // ── User CRUD ─────────────────────────────────────────

  function openUsuarioModal(data) {
    setForm({ nombre: data.nombre || '', email: data.email || '', rol: data.rol || 'USUARIO' });
    setModal({ type: 'usuario', mode: 'edit', data });
  }

  async function saveUsuario() {
    try {
      await axios.put(`${API}/api/usuarios/${modal.data.id}`, form, { headers: authHeaders() });
      setModal(null);
      fetchUsuarios();
      showToast('Usuario actualizado');
    } catch {
      showToast('Error al actualizar el usuario');
    }
  }

  async function deleteUsuario(id) {
    if (!window.confirm('¿Eliminar este usuario?')) return;
    try {
      await axios.delete(`${API}/api/usuarios/${id}`, { headers: authHeaders() });
      fetchUsuarios();
      showToast('Usuario eliminado');
    } catch {
      showToast('Error al eliminar el usuario');
    }
  }

  // ── Formatters ────────────────────────────────────────

  const fmt = {
    date:  (d) => d ? new Date(d).toLocaleDateString('es-ES') : '—',
    price: (p) => p != null ? `${Number(p).toFixed(2)} €` : '—'
  };

  const TABS = [
    { key: 'resumen',   label: 'Resumen' },
    { key: 'productos', label: 'Productos' },
    { key: 'pedidos',   label: 'Pedidos' },
    { key: 'usuarios',  label: 'Usuarios' }
  ];

  // ── Render ────────────────────────────────────────────

  return (
    <div className="adm-shell">

      {/* Sidebar */}
      <aside className="adm-sidebar">
        <div className="adm-sidebar-brand">
          <Link to="/" className="adm-brand-link">F. Minimal</Link>
          <span className="adm-admin-badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            Admin
          </span>
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          {TABS.map(t => (
            <button
              key={t.key}
              className={`adm-nav-item${tab === t.key ? ' adm-nav-item--active' : ''}`}
              onClick={() => setTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="adm-main">

        {/* ── Resumen ──────────────────────────────────── */}
        {tab === 'resumen' && (
          <section>
            <h1 className="adm-heading">Resumen</h1>
            {stats ? (
              <>
                <div className="adm-kpi-grid">
                  <KpiCard label="Productos" value={stats.totalProductos} />
                  <KpiCard label="Usuarios" value={stats.totalUsuarios} />
                  <KpiCard label="Pedidos" value={stats.totalPedidos} />
                  <KpiCard label="Ingresos" value={fmt.price(stats.ingresosTotales)} />
                </div>

                <div className="adm-grid-2">
                  <div className="adm-card">
                    <p className="adm-card-title">Pedidos por estado</p>
                    {stats.pedidosPorEstado && Object.entries(stats.pedidosPorEstado).map(([estado, count]) => (
                      <div key={estado} className="adm-stat-row">
                        <span className={`adm-badge adm-badge--${estado.toLowerCase()}`}>{estado}</span>
                        <span>{count}</span>
                      </div>
                    ))}
                  </div>

                  <div className="adm-card">
                    <p className="adm-card-title">Top 5 productos</p>
                    {stats.topProductos?.length
                      ? stats.topProductos.map((p, i) => (
                          <div key={p.productoId} className="adm-stat-row">
                            <span>{i + 1}. {p.nombreProducto}</span>
                            <span className="adm-muted">{p.totalVendido} uds.</span>
                          </div>
                        ))
                      : <p className="adm-muted">Sin ventas registradas</p>
                    }
                  </div>
                </div>

                <div className="adm-card adm-mt">
                  <p className="adm-card-title">Últimos 5 pedidos</p>
                  <table className="adm-table">
                    <thead>
                      <tr>
                        <th>#</th><th>Cliente</th><th>Fecha</th><th>Estado</th><th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.ultimosPedidos?.length
                        ? stats.ultimosPedidos.map(p => (
                            <tr key={p.id}>
                              <td>{p.id}</td>
                              <td>{p.nombreUsuario}</td>
                              <td>{fmt.date(p.fechaPedido)}</td>
                              <td>
                                <span className={`adm-badge adm-badge--${p.estado?.toLowerCase()}`}>
                                  {p.estado}
                                </span>
                              </td>
                              <td>{fmt.price(p.total)}</td>
                            </tr>
                          ))
                        : <tr><td colSpan="5" className="adm-empty">Sin pedidos</td></tr>
                      }
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <p className="adm-muted">Cargando estadísticas...</p>
            )}
          </section>
        )}

        {/* ── Productos ────────────────────────────────── */}
        {tab === 'productos' && (
          <section>
            <div className="adm-section-header">
              <h1 className="adm-heading">Productos</h1>
              <button className="adm-btn-primary" onClick={() => openProductoModal('create')}>
                + Nuevo producto
              </button>
            </div>
            <div className="adm-card">
              <table className="adm-table">
                <thead>
                  <tr>
                    <th>#</th><th>Nombre</th><th>Categoría</th><th>Género</th><th>Precio</th><th>Stock</th><th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.length
                    ? productos.map(p => (
                        <tr key={p.id}>
                          <td>{p.id}</td>
                          <td>{p.nombre}</td>
                          <td>{p.categoria?.nombre}</td>
                          <td>{p.categoria?.genero?.nombre}</td>
                          <td>{fmt.price(p.precio)}</td>
                          <td>{p.stock ?? '—'}</td>
                          <td>
                            <button className="adm-btn-sm" onClick={() => openProductoModal('edit', p)}>
                              Editar
                            </button>
                            <button className="adm-btn-sm adm-btn-danger" onClick={() => deleteProducto(p.id)}>
                              Eliminar
                            </button>
                          </td>
                        </tr>
                      ))
                    : <tr><td colSpan="7" className="adm-empty">Sin productos</td></tr>
                  }
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* ── Pedidos ───────────────────────────────────── */}
        {tab === 'pedidos' && (
          <section>
            <div className="adm-section-header">
              <h1 className="adm-heading">Pedidos</h1>
              <select
                className="adm-select"
                value={filtroEstado}
                onChange={e => setFiltroEstado(e.target.value)}
              >
                <option value="">Todos los estados</option>
                {ESTADOS_PEDIDO.map(e => <option key={e} value={e}>{e}</option>)}
              </select>
            </div>
            <div className="adm-card">
              <table className="adm-table">
                <thead>
                  <tr>
                    <th>#</th><th>Cliente</th><th>Fecha</th><th>Total</th><th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {pedidos.length
                    ? pedidos.map(p => (
                        <tr key={p.id}>
                          <td>{p.id}</td>
                          <td>{p.usuario?.nombre}</td>
                          <td>{fmt.date(p.fechaPedido)}</td>
                          <td>{fmt.price(p.total)}</td>
                          <td>
                            <select
                              className="adm-select-inline"
                              value={p.estado}
                              onChange={e => cambiarEstadoPedido(p.id, e.target.value)}
                            >
                              {ESTADOS_PEDIDO.map(e => <option key={e} value={e}>{e}</option>)}
                            </select>
                          </td>
                        </tr>
                      ))
                    : <tr><td colSpan="5" className="adm-empty">Sin pedidos</td></tr>
                  }
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* ── Usuarios ─────────────────────────────────── */}
        {tab === 'usuarios' && (
          <section>
            <h1 className="adm-heading">Usuarios</h1>
            <div className="adm-card">
              <table className="adm-table">
                <thead>
                  <tr>
                    <th>#</th><th>Nombre</th><th>Email</th><th>Rol</th><th>Activo</th><th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.length
                    ? usuarios.map(u => (
                        <tr key={u.id}>
                          <td>{u.id}</td>
                          <td>{u.nombre}</td>
                          <td>{u.email}</td>
                          <td>
                            <span className={`adm-badge adm-badge--${u.rol?.toLowerCase()}`}>
                              {u.rol}
                            </span>
                          </td>
                          <td>{u.activo ? 'Sí' : 'No'}</td>
                          <td>
                            <button className="adm-btn-sm" onClick={() => openUsuarioModal(u)}>
                              Editar
                            </button>
                            <button
                              className="adm-btn-sm adm-btn-danger"
                              onClick={() => deleteUsuario(u.id)}
                            >
                              Eliminar
                            </button>
                          </td>
                        </tr>
                      ))
                    : <tr><td colSpan="6" className="adm-empty">Sin usuarios</td></tr>
                  }
                </tbody>
              </table>
            </div>
          </section>
        )}
      </main>

      {/* ── Modal: Producto ───────────────────────────────── */}
      {modal?.type === 'producto' && (
        <Modal
          title={modal.mode === 'edit' ? 'Editar producto' : 'Nuevo producto'}
          onClose={() => setModal(null)}
          onSave={saveProducto}
        >
          <div className="adm-form-field">
            <label>Nombre</label>
            <input
              type="text"
              value={form.nombre}
              onChange={e => setForm({ ...form, nombre: e.target.value })}
            />
          </div>
          <div className="adm-form-field">
            <label>Descripción</label>
            <textarea
              rows={3}
              value={form.descripcion}
              onChange={e => setForm({ ...form, descripcion: e.target.value })}
            />
          </div>
          <div className="adm-form-field">
            <label>URL imagen</label>
            <input
              type="text"
              value={form.imagenUrl}
              onChange={e => setForm({ ...form, imagenUrl: e.target.value })}
            />
          </div>
          <div className="adm-form-row">
            <div className="adm-form-field">
              <label>Stock</label>
              <input
                type="number"
                min="0"
                value={form.stock}
                onChange={e => setForm({ ...form, stock: e.target.value })}
              />
            </div>
            <div className="adm-form-field">
              <label>Precio (€)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={form.precio}
                onChange={e => setForm({ ...form, precio: e.target.value })}
              />
            </div>
            <div className="adm-form-field">
              <label>Categoría</label>
              <select
                value={form.categoriaId}
                onChange={e => setForm({ ...form, categoriaId: e.target.value })}
              >
                <option value="">Seleccionar...</option>
                {categorias.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.genero?.nombre} — {c.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {modal.mode === 'edit' && (
            <div className="adm-form-field">
              <label>Tallas</label>
              <div className="adm-tallas-assigned">
                {productoTallas.length > 0
                  ? productoTallas.map(t => (
                      <span key={t.id} className="adm-talla-chip">
                        {t.nombre}
                        <button
                          className="adm-talla-chip-remove"
                          onClick={() => removeTallaProducto(t.nombre)}
                          title={`Quitar talla ${t.nombre}`}
                        >×</button>
                      </span>
                    ))
                  : <span className="adm-muted" style={{ fontSize: '0.8rem' }}>Sin tallas asignadas</span>
                }
              </div>
              <div className="adm-tallas-available">
                {TALLAS_DISPONIBLES
                  .filter(t => !productoTallas.some(pt => pt.nombre === t))
                  .map(t => (
                    <button key={t} className="adm-talla-btn" onClick={() => addTallaProducto(t)}>
                      {t}
                    </button>
                  ))
                }
              </div>
            </div>
          )}
        </Modal>
      )}

      {/* ── Modal: Usuario ────────────────────────────────── */}
      {modal?.type === 'usuario' && (
        <Modal title="Editar usuario" onClose={() => setModal(null)} onSave={saveUsuario}>
          <div className="adm-form-field">
            <label>Nombre</label>
            <input
              type="text"
              value={form.nombre}
              onChange={e => setForm({ ...form, nombre: e.target.value })}
            />
          </div>
          <div className="adm-form-field">
            <label>Email</label>
            <input
              type="email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="adm-form-field">
            <label>Rol</label>
            <select
              value={form.rol}
              onChange={e => setForm({ ...form, rol: e.target.value })}
            >
              <option value="USUARIO">USUARIO</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>
        </Modal>
      )}

      {/* Toast notification */}
      {toast && <div className="adm-toast">{toast}</div>}
    </div>
  );
};

export default AdminPanel;
