import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaShoppingCart, FaTruck, FaTshirt, FaExchangeAlt, FaGift, FaEnvelope
} from 'react-icons/fa';
import './SupportPages.css';
import './FaqAccordion.css';

export const categorias = [
  {
    nombre: 'Pedidos y pagos',
    slug: 'pedidos-pagos',
    icono: <FaShoppingCart size={24} />,
    preguntas: [
      {
        pregunta: '¿Qué métodos de pago aceptan en F. Minimal?',
        respuesta: 'Aceptamos pagos con Visa, MasterCard y PayPal. Todas las operaciones se procesan de forma segura.'
      },
      {
        pregunta: '¿Necesito crear una cuenta para comprar?',
        respuesta: 'No es obligatorio, aunque al registrarte podrás guardar favoritos, consultar pedidos y comprar más rápido.'
      },
      {
        pregunta: '¿Puedo modificar o cancelar un pedido ya realizado?',
        respuesta: 'Si tu pedido aún no ha sido preparado, podremos ayudarte a revisarlo. Escríbenos cuanto antes para gestionarlo contigo.'
      }
    ]
  },
  {
    nombre: 'Envíos y entregas',
    slug: 'envios-entregas',
    icono: <FaTruck size={24} />,
    preguntas: [
      {
        pregunta: '¿Realizan envíos internacionales?',
        respuesta: 'Sí, realizamos envíos nacionales e internacionales. Los costes y plazos se calculan al finalizar la compra según el destino.'
      },
      {
        pregunta: '¿Cuánto tarda en llegar mi pedido?',
        respuesta: 'Los envíos nacionales suelen tardar entre 2 y 5 días hábiles. Los internacionales, entre 7 y 15 días hábiles según el país.'
      },
      {
        pregunta: '¿Cómo puedo hacer el seguimiento de mi pedido?',
        respuesta: 'Cuando tu pedido salga de almacén, recibirás un correo con el número de seguimiento y el enlace para consultarlo.'
      }
    ]
  },
  {
    nombre: 'Productos y tallas',
    slug: 'productos-tallas',
    icono: <FaTshirt size={24} />,
    preguntas: [
      {
        pregunta: '¿Cómo elijo la talla correcta?',
        respuesta: 'Cada producto incluye una guía de tallas. Si tienes dudas, compara las medidas con una prenda similar que ya te siente bien.'
      },
      {
        pregunta: '¿Los productos se ven exactamente como en las fotos?',
        respuesta: 'Sí, aunque puede existir una ligera variación de color según la pantalla o el dispositivo desde el que consultes la web.'
      }
    ]
  },
  {
    nombre: 'Cambios y devoluciones',
    slug: 'cambios-devoluciones',
    icono: <FaExchangeAlt size={24} />,
    preguntas: [
      {
        pregunta: '¿Puedo devolver o cambiar un producto si no me queda?',
        respuesta: 'Sí, aceptamos cambios y devoluciones dentro de los 14 días posteriores a la recepción, siempre que la prenda esté sin usar y conserve su etiqueta original.'
      },
      {
        pregunta: '¿Cómo solicito una devolución?',
        respuesta: 'Escríbenos a devoluciones@fashion.com con tu número de pedido y te guiaremos paso a paso.'
      }
    ]
  },
  {
    nombre: 'Promociones y descuentos',
    slug: 'promociones-descuentos',
    icono: <FaGift size={24} />,
    preguntas: [
      {
        pregunta: '¿Tenéis algún descuento por registrarse?',
        respuesta: 'Sí. Si te suscribes al boletín, recibirás un 10% de descuento en tu primera compra.'
      },
      {
        pregunta: '¿Cómo uso un código de descuento?',
        respuesta: 'Al finalizar la compra, introduce el código en el campo de cupón y se aplicará automáticamente al total.'
      }
    ]
  },
  {
    nombre: 'Atención al cliente',
    slug: 'atencion-cliente',
    icono: <FaEnvelope size={24} />,
    preguntas: [
      {
        pregunta: '¿Cómo puedo comunicarme con vosotros?',
        respuesta: 'Puedes escribirnos a contacto@fashion.com o por WhatsApp y chat de lunes a viernes, de 9:00 a 18:00.'
      }
    ]
  }
];

const FaqAccordion = () => {
  const navigate = useNavigate();

  return (
    <section className="support-page faq-page">
      <div className="support-shell">
        <div className="support-hero faq-hero">
          <p className="support-kicker">FAQ</p>
          <h1 className="support-title">Respuestas para comprar con tranquilidad.</h1>
          <p className="support-subtitle">
            Explora las categorías más consultadas y entra en cada bloque para encontrar la ayuda que necesitas.
          </p>
        </div>

        <div className="faq-cards-grid">
          {categorias.map((cat) => (
            <button
              key={cat.slug}
              className="faq-card"
              onClick={() => navigate(`/faq/${cat.slug}`)}
              type="button"
            >
              <div className="faq-card-icon">{cat.icono}</div>
              <div className="faq-card-info">
                <div className="faq-card-title">{cat.nombre}</div>
                <div className="faq-card-count">{cat.preguntas.length} artículo{cat.preguntas.length > 1 ? 's' : ''}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqAccordion;
