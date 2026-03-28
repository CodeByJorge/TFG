import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { categorias } from './FaqAccordion';
import './SupportPages.css';
import './FaqAccordion.css';

const FaqCategoria = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const categoria = categorias.find((cat) => cat.slug === slug);
  const [open, setOpen] = useState({});

  if (!categoria) {
    return (
      <section className="support-page faq-page">
        <div className="support-shell">
          <div className="support-card faq-category-shell">
            <h2>Categoría no encontrada</h2>
          </div>
        </div>
      </section>
    );
  }

  const handleToggle = (qIdx) => {
    setOpen((prev) => ({
      ...prev,
      [qIdx]: !prev[qIdx]
    }));
  };

  return (
    <section className="support-page faq-page">
      <div className="support-shell">
        <div className="support-card faq-category-shell">
          <button className="support-link-button faq-back-btn" type="button" onClick={() => navigate('/faq')}>
            Volver a categorías
          </button>
          <p className="support-kicker">FAQ</p>
          <h1 className="support-title faq-category-title">{categoria.nombre}</h1>
          <p className="support-subtitle">Selecciona una pregunta para ver la respuesta de forma clara y rápida.</p>

          <div className="faq-accordion-list">
            {categoria.preguntas.map((item, qIdx) => (
              <div key={qIdx} className={`faq-item ${open[qIdx] ? 'open' : ''}`}>
                <button className="faq-question" type="button" onClick={() => handleToggle(qIdx)}>
                  <span>{item.pregunta}</span>
                  <span className={`arrow ${open[qIdx] ? 'rotated' : ''}`}>+</span>
                </button>
                <div className="faq-answer">
                  {open[qIdx] && <p>{item.respuesta}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqCategoria;
