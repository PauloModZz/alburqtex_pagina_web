export interface LegalSection {
  id: string;
  title: string;
  intro?: string;
  paragraphs?: string[];
  bullets?: string[];
}

// Redactado con base en el marco legal ecuatoriano vigente para comercio
// electrónico y protección de datos: Ley Orgánica de Defensa del Consumidor,
// Ley de Comercio Electrónico, Firmas Electrónicas y Mensajes de Datos, y
// Ley Orgánica de Protección de Datos Personales (LOPDP). Es una guía general
// de buena fe: se recomienda revisión por un abogado ecuatoriano antes de
// considerarla una certificación de cumplimiento total.
export const LEGAL_LAST_UPDATED = 'Agosto de 2026';

export const LEGAL_SECTIONS: LegalSection[] = [
  {
    id: 'introduccion',
    title: '1. Introducción y aceptación',
    paragraphs: [
      'Bienvenido al sitio web de Alburqtex ("el Sitio"), operado por Alburqtex, taller de personalización textil con domicilio en Calle El Oro 1303, entre Antepara y Machala, diagonal a la Metrovía, Guayaquil, Ecuador.',
      'Al navegar en este Sitio, contactarnos por WhatsApp o redes sociales, o solicitar una cotización o pedido, usted ("el Cliente") acepta íntegramente estos Términos y Condiciones, la Política de Privacidad y la Política de Cookies. Si no está de acuerdo con alguno de estos términos, le pedimos no utilizar el Sitio ni nuestros servicios.',
      'Este documento se rige por la legislación de la República del Ecuador, incluyendo entre otras normas: la Ley Orgánica de Defensa del Consumidor, la Ley de Comercio Electrónico, Firmas Electrónicas y Mensajes de Datos, y la Ley Orgánica de Protección de Datos Personales (LOPDP).',
    ],
  },
  {
    id: 'identificacion',
    title: '2. Identificación del prestador',
    bullets: [
      'Nombre comercial: Alburqtex',
      'Actividad: taller de bordado, estampado, sublimado y serigrafía personalizados sobre prendas y artículos textiles, elaborados a pedido.',
      'Domicilio: Calle El Oro 1303, entre Antepara y Machala, Guayaquil, Ecuador.',
      'Canal de contacto oficial: WhatsApp e Instagram @alburqtex.',
    ],
  },
  {
    id: 'productos',
    title: '3. Productos y pedidos personalizados',
    paragraphs: [
      'Todos los productos ofrecidos son fabricados a pedido según las especificaciones entregadas por el Cliente: tipo de prenda, talla, color, técnica de personalización (bordado, estampado, sublimado o serigrafía), texto o nombre a incluir y/o logotipo a reproducir.',
      'Las imágenes publicadas en el Sitio son referenciales. El producto final puede presentar variaciones mínimas de color, textura o acabado propias de procesos artesanales y de personalización, que no se consideran defectos de fabricación.',
      'El Cliente es responsable de verificar que la información proporcionada (talla, texto, ortografía del nombre, archivo de logo) sea correcta antes de aprobar la producción. Alburqtex no se hace responsable por errores de tipeo, talla o especificaciones informadas y aprobadas por el propio Cliente antes del inicio de producción.',
    ],
  },
  {
    id: 'pedidos-pago',
    title: '4. Cotización, confirmación y pago',
    paragraphs: [
      'Toda cotización compartida por WhatsApp u otro canal oficial es referencial y está sujeta a confirmación de disponibilidad, tallas, colores y tiempos de producción.',
      'El pedido se considera confirmado únicamente cuando: (a) el Cliente aprueba de forma expresa el diseño final ("arte") a producir, y (b) se recibe el pago o anticipo acordado, en la forma de pago que se defina en cada cotización.',
      'Alburqtex podrá solicitar un anticipo para iniciar la producción de pedidos personalizados; el porcentaje y saldo pendiente se informan en cada cotización particular.',
    ],
  },
  {
    id: 'precios',
    title: '5. Precios',
    paragraphs: [
      'Los precios publicados están expresados en dólares de los Estados Unidos de América (USD), moneda de curso legal en Ecuador, y no incluyen costos de envío salvo que se indique expresamente lo contrario.',
      'Alburqtex se reserva el derecho de modificar sus precios sin previo aviso. El precio aplicable a cada pedido será el vigente al momento de confirmar la cotización con el Cliente.',
    ],
  },
  {
    id: 'entregas',
    title: '6. Tiempos y forma de entrega',
    paragraphs: [
      'Coordinamos la entrega de tu pedido según lo acordado en la cotización: retiro en nuestro local en Guayaquil o envío a otras ciudades del Ecuador a través del medio que se acuerde con el Cliente.',
      'Al tratarse de productos personalizados hechos a pedido, los tiempos de producción y entrega varían según el volumen, la técnica solicitada y la complejidad del diseño, y se informan de forma estimada en cada cotización.',
      'El costo de envío no está incluido en el precio del producto y se cotiza aparte según el destino y el medio de envío elegido.',
    ],
  },
  {
    id: 'devoluciones',
    title: '7. Cambios, devoluciones y garantía',
    paragraphs: [
      'Dado que se trata de bienes personalizados, confeccionados según las especificaciones y el diseño aprobado por el Cliente, no se aceptan devoluciones ni cambios por motivo de arrepentimiento una vez aprobado el arte final e iniciada la producción.',
      'Sí corregimos o reponemos, sin costo adicional, cualquier unidad que presente un defecto de fabricación atribuible a Alburqtex (por ejemplo, error en el bordado/estampado distinto al diseño aprobado, o falla de materiales), siempre que se reporte dentro de las 48 horas siguientes a la entrega y el producto se conserve en su estado original, sin uso ni lavado.',
      'Esta política se establece en el marco de la Ley Orgánica de Defensa del Consumidor del Ecuador, sin perjuicio de los derechos irrenunciables que dicha ley reconoce a favor del consumidor.',
    ],
  },
  {
    id: 'propiedad-intelectual',
    title: '8. Propiedad intelectual y uso de marcas de terceros',
    paragraphs: [
      'El Cliente declara y garantiza contar con la titularidad o la autorización correspondiente para el uso y reproducción de cualquier logotipo, escudo, marca o diseño que solicite aplicar sobre sus productos. El Cliente asume responsabilidad exclusiva frente a reclamos de terceros derivados del uso no autorizado de dichos elementos.',
      'Los diseños propios, fotografías y contenidos publicados en este Sitio son propiedad de Alburqtex y no pueden reproducirse sin autorización previa.',
      'Las marcas, escudos e imágenes de terceros (instituciones, empresas o clientes) que se exhiben en la sección "Confían en nosotros" se muestran únicamente con fines ilustrativos, para identificar relaciones comerciales reales de Alburqtex con dichas organizaciones, y no implican patrocinio, respaldo ni afiliación oficial de esas entidades hacia Alburqtex.',
    ],
  },
  {
    id: 'privacidad',
    title: '9. Política de privacidad y protección de datos personales',
    paragraphs: [
      'Responsable del tratamiento: Alburqtex, con domicilio en Guayaquil, Ecuador.',
      'Datos que recopilamos: nombre, número de teléfono/WhatsApp y, cuando aplica, dirección de entrega, así como los archivos que el Cliente comparta voluntariamente (por ejemplo, una imagen de logo) para la elaboración de su pedido.',
      'Finalidad: gestionar cotizaciones y pedidos, producción, coordinación de entregas, soporte postventa y, únicamente cuando el Cliente lo autorice expresamente, comunicación comercial.',
      'No vendemos ni compartimos tus datos personales con terceros para fines comerciales. Solo compartimos la información estrictamente necesaria con proveedores logísticos para hacer llegar tu pedido.',
      'Conservamos tus datos mientras exista una relación comercial vigente y, después, durante el plazo necesario para atender obligaciones legales, contables o de garantía.',
      'De acuerdo con la Ley Orgánica de Protección de Datos Personales (LOPDP) del Ecuador, puedes ejercer en cualquier momento tus derechos de acceso, rectificación, actualización, eliminación, oposición, portabilidad y revocatoria del consentimiento, escribiéndonos por nuestro WhatsApp oficial.',
      'Nuestros servicios están dirigidos a personas mayores de edad, empresas e instituciones (colegios, corporaciones). No recopilamos intencionalmente datos de menores de edad sin la autorización de su representante legal.',
    ],
  },
  {
    id: 'cookies',
    title: '10. Política de cookies',
    paragraphs: [
      'Las cookies y tecnologías similares (como el almacenamiento local del navegador) son pequeños archivos que permiten recordar tus preferencias o reconocer tu visita.',
      'Actualmente este Sitio utiliza únicamente almacenamiento técnico esencial, por ejemplo para recordar la preferencia que elijas en el aviso de cookies. No utilizamos cookies de analítica ni de publicidad de terceros.',
      'Si en el futuro incorporamos herramientas de analítica o marketing que usen cookies no esenciales, actualizaremos esta política y solicitaremos tu consentimiento antes de activarlas.',
      'Puedes aceptar o rechazar el uso de cookies no esenciales mediante el aviso que se muestra al ingresar al Sitio, y puedes cambiar tu decisión en cualquier momento borrando los datos de navegación de tu navegador.',
    ],
  },
  {
    id: 'responsabilidad',
    title: '11. Limitación de responsabilidad',
    paragraphs: [
      'Alburqtex no será responsable por retrasos ocasionados por causas de fuerza mayor, caso fortuito, o fallos de servicios de terceros (mensajería, WhatsApp, redes sociales, transporte) ajenos a su control razonable.',
      'Procuramos que la información publicada en el Sitio sea exacta y esté actualizada, pero no garantizamos la ausencia total de errores tipográficos o de disponibilidad de stock en tiempo real.',
    ],
  },
  {
    id: 'ley-aplicable',
    title: '12. Legislación aplicable y resolución de conflictos',
    paragraphs: [
      'Estos términos se rigen por las leyes de la República del Ecuador. Ante cualquier controversia, las partes procurarán primero una solución amistosa directa y, de no alcanzarse, se someten a los jueces y tribunales competentes del cantón Guayaquil.',
    ],
  },
  {
    id: 'modificaciones',
    title: '13. Modificaciones a este documento',
    paragraphs: [
      `Alburqtex podrá actualizar estos Términos y Condiciones en cualquier momento. La versión vigente será siempre la publicada en este Sitio, indicando su fecha de última actualización (${LEGAL_LAST_UPDATED}).`,
    ],
  },
  {
    id: 'contacto',
    title: '14. Contacto',
    paragraphs: [
      'Para consultas sobre estos términos, tu pedido o tus datos personales, escríbenos por WhatsApp o Instagram @alburqtex, o visítanos en Calle El Oro 1303, entre Antepara y Machala, Guayaquil, Ecuador.',
    ],
  },
];
