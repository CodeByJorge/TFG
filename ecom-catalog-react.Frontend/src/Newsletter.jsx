import React, { useState } from 'react';
import './Newsletter.css';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías agregar la lógica para enviar el email a tu backend o servicio de newsletter
    setSubmitted(true);
  };

  return (
    <section className="newsletter-section">
      <h2>Suscríbete a nuestra newsletter</h2>
      {submitted ? (
        <p className="newsletter-success">Gracias por suscribirte!</p>
      ) : (
        <form className="newsletter-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Tu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Suscribirse</button>
        </form>
      )}
    </section>
  );
};

export default Newsletter; 