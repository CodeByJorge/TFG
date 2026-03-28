import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './ColeccionDetalle.css';

const ColeccionDetalle = () => {
  const { slug } = useParams();
  const [filtros, setFiltros] = useState({
    categoria: 'todos',
    precio: 'todos',
    talla: 'todos',
    color: 'todos'
  });

  // Datos de ejemplo para productos
  const productos = [
    {
      id: 1,
      nombre: "Camiseta Básica",
      precio: 29.99,
      categoria: "ropa",
      talla: ["S", "M", "L", "XL"],
      color: ["negro", "blanco", "gris"],
      imagen: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3",
      descripcion: "Camiseta básica de algodón orgánico",
      destacado: true
    },
    {
      id: 2,
      nombre: "Pantalón Vaquero",
      precio: 59.99,
      categoria: "ropa",
      talla: ["S", "M", "L", "XL"],
      color: ["azul", "negro"],
      imagen: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3",
      descripcion: "Vaquero clásico de corte recto"
    },
    // Añade más productos según necesites
  ];

  const handleFiltroChange = (tipo, valor) => {
    setFiltros(prev => ({
      ...prev,
      [tipo]: valor
    }));
  };

  const productosFiltrados = productos.filter(producto => {
    if (filtros.categoria !== 'todos' && producto.categoria !== filtros.categoria) return false;
    if (filtros.talla !== 'todos' && !producto.talla.includes(filtros.talla)) return false;
    if (filtros.color !== 'todos' && !producto.color.includes(filtros.color)) return false;
    if (filtros.precio !== 'todos') {
      const [min, max] = filtros.precio.split('-').map(Number);
      if (producto.precio < min || producto.precio > max) return false;
    }
    return true;
  });

  return (
    <div className="coleccion-detalle-container">
      <div className="filtros-sidebar">
        <h3>Filtros</h3>
        
        {/* Filtro de Categoría */}
        <div className="filtro-grupo">
          <h4>Categoría</h4>
          <select 
            value={filtros.categoria}
            onChange={(e) => handleFiltroChange('categoria', e.target.value)}
          >
            <option value="todos">Todas las categorías</option>
            <option value="ropa">Ropa</option>
            <option value="accesorios">Accesorios</option>
            <option value="calzado">Calzado</option>
          </select>
        </div>

        {/* Filtro de Precio */}
        <div className="filtro-grupo">
          <h4>Precio</h4>
          <select 
            value={filtros.precio}
            onChange={(e) => handleFiltroChange('precio', e.target.value)}
          >
            <option value="todos">Todos los precios</option>
            <option value="0-25">Menos de 25</option>
            <option value="25-50">25 - 50</option>
            <option value="50-100">50 - 100</option>
            <option value="100-999">Más de 100</option>
          </select>
        </div>

        {/* Filtro de Talla */}
        <div className="filtro-grupo">
          <h4>Talla</h4>
          <select 
            value={filtros.talla}
            onChange={(e) => handleFiltroChange('talla', e.target.value)}
          >
            <option value="todos">Todas las tallas</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>
        </div>

        {/* Filtro de Color */}
        <div className="filtro-grupo">
          <h4>Color</h4>
          <select 
            value={filtros.color}
            onChange={(e) => handleFiltroChange('color', e.target.value)}
          >
            <option value="todos">Todos los colores</option>
            <option value="negro">Negro</option>
            <option value="blanco">Blanco</option>
            <option value="gris">Gris</option>
            <option value="azul">Azul</option>
          </select>
        </div>
      </div>

      <div className="productos-grid">
        {productosFiltrados.map(producto => (
          <div key={producto.id} className="producto-card">
            <div className="producto-imagen">
              <img src={producto.imagen} alt={producto.nombre} />
              {producto.destacado && <span className="destacado-badge">Destacado</span>}
            </div>
            <div className="producto-info">
              <h3>{producto.nombre}</h3>
              <p className="producto-precio">{producto.precio}</p>
              <p className="producto-descripcion">{producto.descripcion}</p>
              <div className="producto-tallas">
                {producto.talla.map(t => (
                  <span key={t} className="talla-badge">{t}</span>
                ))}
              </div>
              <button className="btn-comprar">Añadir al carrito</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColeccionDetalle; 