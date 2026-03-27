import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaShoppingCart, FaTruck, FaTshirt, FaExchangeAlt, FaGift, FaEnvelope
} from 'react-icons/fa';
import './SupportPages.css';
import './FaqAccordion.css';

export const categorias = [
  {
    nombre: 'Pedidos y Pagos',
    slug: 'pedidos-pagos',
    icono: <FaShoppingCart size={24} />,
    preguntas: [
      {
        pregunta: 'Que metodos de pago aceptan en Fashion?',
        respuesta: 'Aceptamos pagos con Visa, MasterCard y PayPal. Todos los pagos se procesan de forma segura para proteger tu informacion.'
      },
      {
        pregunta: 'Necesito crear una cuenta para comprar?',
        respuesta: 'No es obligatorio, pero si te registras podras hacer seguimiento de tus pedidos, guardar productos favoritos y recibir promociones exclusivas.'
      },
      {
        pregunta: 'Puedo modificar o cancelar un pedido ya realizado?',
        respuesta: 'Solo es posible modificar o cancelar un pedido dentro de las primeras 2 horas despues de realizarlo. Contactanos lo antes posible si necesitas hacerlo.'
      }
    ]
  },
  {
    nombre: 'Envios y Entregas',
    slug: 'envios-entregas',
    icono: <FaTruck size={24} />,
    preguntas: [
      {
        pregunta: 'Realizan envios internacionales?',
        respuesta: 'Si, hacemos envios tanto nacionales como internacionales. Los costes y tiempos varian segun el destino y se calculan al finalizar la compra.'
      },
      {
        pregunta: 'Cuanto tarda en llegar mi pedido?',
        respuesta: 'Envios nacionales: entre 2 y 5 dias habiles. Envios internacionales: entre 7 y 15 dias habiles, dependiendo del pais.'
      },
      {
        pregunta: 'Como puedo hacer el seguimiento de mi pedido?',
        respuesta: 'Una vez enviado, recibiras un correo con el numero de seguimiento y el enlace para rastrear tu paquete en tiempo real.'
      }
    ]
  },
  {
    nombre: 'Productos y Tallas',
    slug: 'productos-tallas',
    icono: <FaTshirt size={24} />,
    preguntas: [
      {
        pregunta: 'Como elijo la talla correcta?',
        respuesta: 'Cada producto incluye una guia de tallas. Si tienes dudas, te recomendamos medir una prenda similar que ya tengas y compararla con nuestra tabla.'
      },
      {
        pregunta: 'Los productos se ven exactamente como en las fotos?',
        respuesta: 'Si, pero puede haber una ligera variacion de color dependiendo del dispositivo desde el que veas las imagenes.'
      }
    ]
  },
  {
    nombre: 'Cambios y Devoluciones',
    slug: 'cambios-devoluciones',
    icono: <FaExchangeAlt size={24} />,
    preguntas: [
      {
        pregunta: 'Puedo devolver o cambiar un producto si no me queda?',
        respuesta: 'Si, aceptamos devoluciones y cambios dentro de los 14 dias posteriores a la recepcion, siempre que el producto este sin usar y con su etiqueta original.'
      },
      {
        pregunta: 'Como solicito una devolucion?',
        respuesta: 'Escribenos a devoluciones@fashion.com con tu numero de pedido y te guiaremos en el proceso.'
      }
    ]
  },
  {
    nombre: 'Promociones y Descuentos',
    slug: 'promociones-descuentos',
    icono: <FaGift size={24} />,
    preguntas: [
      {
        pregunta: 'Tienen algun descuento por registrarse?',
        respuesta: 'Si. Si te suscribes al boletin, recibiras un 10% de descuento en tu primera compra.'
      },
      {
        pregunta: 'Como uso un codigo de descuento?',
        respuesta: 'Al finalizar la compra, introduce el codigo en el campo de cupon y se aplicara automaticamente al total.'
      }
    ]
  },
  {
    nombre: 'Atencion al Cliente',
    slug: 'atencion-cliente',
    icono: <FaEnvelope size={24} />,
    preguntas: [
      {
        pregunta: 'Como puedo comunicarme con ustedes?',
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
          <h1 className="support-title">Respuestas para comprar con claridad.</h1>
          <p className="support-subtitle">
            Explora las categorias mas consultadas y entra en cada bloque para ver las respuestas de forma ordenada.
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
                <div className="faq-card-count">{cat.preguntas.length} articulo{cat.preguntas.length > 1 ? 's' : ''}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqAccordion;
