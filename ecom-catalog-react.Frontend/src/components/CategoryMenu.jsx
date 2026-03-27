import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './CategoryMenu.css';

const menus = {
  mujer: [
    { id: 0, name: 'Todos', path: '/todos-productos-mujer' },
    { id: 1, name: 'Camisetas', path: '/mujeres/camisetas' },
    { id: 2, name: 'Pantalones', path: '/mujeres/pantalones' },
    { id: 3, name: 'Vestidos', path: '/mujeres/vestidos' },
    { id: 4, name: 'Zapatos', path: '/mujeres/zapatos' },
    { id: 5, name: 'Colecciones', path: '/colecciones' },
  ],
  hombre: [
    { id: 0, name: 'Todos', path: '/todos-productos-hombre' },
    { id: 1, name: 'Camisetas', path: '/hombres/camisetas' },
    { id: 2, name: 'Pantalones', path: '/hombres/pantalones' },
    { id: 3, name: 'Chaquetas', path: '/hombres/chaquetas' },
    { id: 4, name: 'Zapatos', path: '/hombres/zapatos' },
    { id: 5, name: 'Colecciones', path: '/colecciones' },
  ],
};

const CategoryMenu = ({ section }) => {
  const location = useLocation();
  const inferredSection = section || (location.pathname.includes('/hombres') || location.pathname === '/todos-productos-hombre' ? 'hombre' : 'mujer');
  const currentCategories = menus[inferredSection];

  return (
    <nav className="fashion-category-menu" aria-label="Categorias del catalogo">
      <ul>
        {currentCategories.map((category) => {
          const isActive = location.pathname === category.path;
          return (
            <li key={category.id} className={isActive ? 'is-active' : ''}>
              <Link to={category.path}>{category.name}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default CategoryMenu;
