import React, { useEffect, useState } from 'react';
import './FilterPanel.css';

const DEFAULT_FILTERS = {
  priceRange: { min: 0, max: 250 },
  sortBy: 'featured',
  size: '',
  color: '',
};

const sizes = ['XS', 'S', 'M', 'L', 'XL'];
const colors = [
  { label: 'Negro', value: 'negro', hex: '#171717' },
  { label: 'Blanco', value: 'blanco', hex: '#f6f3ee' },
  { label: 'Azul', value: 'azul', hex: '#5f7592' },
  { label: 'Beige', value: 'beige', hex: '#d8c7af' },
  { label: 'Marron', value: 'marron', hex: '#8b6b53' },
  { label: 'Verde', value: 'verde', hex: '#667860' },
];

const sortOptions = [
  { value: 'featured', label: 'Destacados' },
  { value: 'priceAsc', label: 'Precio ascendente' },
  { value: 'priceDesc', label: 'Precio descendente' },
  { value: 'nameAsc', label: 'Nombre A-Z' },
];

const FilterPanel = ({
  filters = DEFAULT_FILTERS,
  onFilterChange,
  onClose,
  onClear = () => {},
  productCount = 0,
  title = 'Catalogo',
}) => {
  const [draftFilters, setDraftFilters] = useState(filters);

  useEffect(() => {
    setDraftFilters(filters);
  }, [filters]);

  const updateDraft = (partial) => {
    setDraftFilters((current) => ({ ...current, ...partial }));
  };

  const handlePriceChange = (field, value) => {
    const numericValue = Number(value);
    setDraftFilters((current) => ({
      ...current,
      priceRange: {
        ...current.priceRange,
        [field]: numericValue,
      },
    }));
  };

  const handleApply = () => {
    onFilterChange(draftFilters);
  };

  return (
    <div className="filter-panel fashion-filter-panel">
      <div className="fashion-filter-header">
        <div>
          <span className="fashion-filter-eyebrow">Editar seleccion</span>
          <h3>{title}</h3>
          <p>{productCount} resultados con la configuracion actual.</p>
        </div>
        <button type="button" className="fashion-filter-close" onClick={onClose} aria-label="Cerrar filtros">
          x
        </button>
      </div>

      <div className="fashion-filter-section">
        <div className="fashion-filter-section-head">
          <h4>Orden</h4>
          <span>Como quieres explorar la coleccion</span>
        </div>
        <div className="fashion-chip-grid">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`fashion-chip ${draftFilters.sortBy === option.value ? 'is-active' : ''}`}
              onClick={() => updateDraft({ sortBy: option.value })}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="fashion-filter-section">
        <div className="fashion-filter-section-head">
          <h4>Precio</h4>
          <span>Define el rango que mejor encaja contigo</span>
        </div>
        <div className="fashion-price-grid">
          <label>
            <span>Minimo</span>
            <input
              type="number"
              min="0"
              max={draftFilters.priceRange.max}
              value={draftFilters.priceRange.min}
              onChange={(event) => handlePriceChange('min', event.target.value)}
            />
          </label>
          <label>
            <span>Maximo</span>
            <input
              type="number"
              min={draftFilters.priceRange.min}
              max="250"
              value={draftFilters.priceRange.max}
              onChange={(event) => handlePriceChange('max', event.target.value)}
            />
          </label>
        </div>
        <input
          className="fashion-range"
          type="range"
          min="0"
          max="250"
          value={draftFilters.priceRange.max}
          onChange={(event) => handlePriceChange('max', event.target.value)}
        />
        <div className="fashion-price-meta">
          <span>{draftFilters.priceRange.min} EUR</span>
          <span>{draftFilters.priceRange.max} EUR</span>
        </div>
      </div>

      <div className="fashion-filter-section">
        <div className="fashion-filter-section-head">
          <h4>Talla</h4>
          <span>Selecciona una talla para afinar mejor</span>
        </div>
        <div className="fashion-chip-grid fashion-chip-grid--sizes">
          <button
            type="button"
            className={`fashion-chip ${draftFilters.size === '' ? 'is-active' : ''}`}
            onClick={() => updateDraft({ size: '' })}
          >
            Todas
          </button>
          {sizes.map((size) => (
            <button
              key={size}
              type="button"
              className={`fashion-chip ${draftFilters.size === size ? 'is-active' : ''}`}
              onClick={() => updateDraft({ size })}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="fashion-filter-section">
        <div className="fashion-filter-section-head">
          <h4>Color</h4>
          <span>Elige la tonalidad dominante</span>
        </div>
        <div className="fashion-color-grid">
          <button
            type="button"
            className={`fashion-color-swatch fashion-color-swatch--all ${draftFilters.color === '' ? 'is-active' : ''}`}
            onClick={() => updateDraft({ color: '' })}
          >
            Todos
          </button>
          {colors.map((color) => (
            <button
              key={color.value}
              type="button"
              className={`fashion-color-swatch ${draftFilters.color === color.value ? 'is-active' : ''}`}
              onClick={() => updateDraft({ color: color.value })}
            >
              <span className="fashion-color-dot" style={{ backgroundColor: color.hex }} />
              {color.label}
            </button>
          ))}
        </div>
      </div>

      <div className="fashion-filter-actions">
        <button type="button" className="fashion-filter-secondary" onClick={onClear}>
          Restablecer
        </button>
        <button type="button" className="fashion-filter-primary" onClick={handleApply}>
          Ver resultados
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;
