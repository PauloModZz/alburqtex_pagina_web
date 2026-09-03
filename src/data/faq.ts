export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface FaqCategory {
  id: string;
  title: string;
  items: FaqItem[];
}

export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    id: 'pedidos-y-minimos',
    title: 'Pedidos y mínimos',
    items: [
      {
        id: 'pedido-minimo',
        question: '¿Cuál es el pedido mínimo?',
        answer:
          'No hay un mínimo de piezas — aceptamos pedidos desde 1 unidad, tanto para empresas como para particulares. Lo que sí cambia es el precio: en pedidos chicos se cobra el arte/diseño y el transporte, y si hace falta comprar materiales especiales para tu pedido (telas, gorras, etc.) ese costo también se suma. Mientras más piezas pidas con el mismo diseño, mejor te queda el precio por unidad — te lo confirmamos exacto por WhatsApp según tu caso.',
      },
      {
        id: 'una-sola-pieza',
        question: '¿Puedo pedir una sola pieza?',
        answer:
          'Sí, atendemos tanto a empresas que necesitan volumen como a personas que quieren una sola prenda bordada — por ejemplo, un regalo o una pieza personal. El precio por unidad en un pedido de una sola pieza es mayor que en un pedido grande, porque el ponchado (digitalización) del diseño y el montaje en bastidor tienen un costo fijo que en un pedido grande se reparte entre más prendas.',
      },
      {
        id: 'pedidos-recurrentes',
        question: '¿Hacen pedidos recurrentes o reposiciones con el mismo diseño?',
        answer:
          'Sí. Una vez que un logo o diseño ya fue digitalizado (ponchado) para tu cuenta, guardamos ese archivo, así que una reposición o un pedido nuevo con el mismo diseño no vuelve a pagar el costo de digitalización — solo la prenda y el bordado. Esto es especialmente útil para empresas que renuevan uniformes cada cierto tiempo o van sumando personal nuevo.',
      },
    ],
  },
  {
    id: 'archivos-y-diseno',
    title: 'Archivos y diseño',
    items: [
      {
        id: 'que-archivo-enviar',
        question: '¿Qué archivo necesito enviar para bordar mi logo?',
        answer:
          'Lo ideal es un archivo vectorial (AI, EPS, PDF o SVG), porque se puede escalar a cualquier tamaño sin perder nitidez y facilita mucho el trabajo de digitalización. Si no tienes un vectorial, también podemos trabajar desde una imagen de buena resolución (PNG o JPG grande, sin comprimir de más) — entre más grande y nítida sea la imagen original, mejor sale el bordado. Puedes mandarnos el archivo directo por WhatsApp cuando coordinemos tu pedido.',
      },
      {
        id: 'foto-o-captura',
        question: '¿Sirve una foto o una captura de pantalla del logo?',
        answer:
          'Puede servir como referencia para que sepamos qué logo es, pero no como archivo final de trabajo. Una foto tomada con celular o una captura de pantalla suele venir en baja resolución, con compresión, ángulos torcidos o el fondo incluido — todo eso complica la digitalización y puede afectar el resultado final, sobre todo en detalles pequeños o texto fino. Si solo tienes ese tipo de imagen, dínoslo: muchas veces podemos reconstruir el logo a partir de ahí, aunque tome un poco más de tiempo.',
      },
      {
        id: 'que-es-el-ponchado',
        question: '¿Qué es el ponchado o digitalización y por qué se cobra aparte?',
        answer:
          'El ponchado (o digitalización) es el proceso de convertir tu logo en un archivo de puntadas que la máquina de bordar pueda leer — no es una simple conversión automática, es un trabajo manual donde se decide el tipo de puntada, la dirección del hilo, el orden en que se borda cada parte y cómo se resuelven los detalles finos, para que el resultado se vea bien en tela y no solo en pantalla. Por eso se cobra como un costo aparte, independiente del precio de la prenda: es trabajo de diseño una sola vez, no por cada unidad. El costo exacto de digitalizar tu logo se cotiza según su complejidad — lo confirmamos por WhatsApp antes de producir.',
      },
      {
        id: 'archivo-digitalizado-es-mio',
        question: '¿El archivo digitalizado queda a mi nombre? ¿Me lo pueden entregar?',
        answer:
          'El archivo de bordado de tu logo queda guardado en nuestro sistema para tus próximos pedidos, así no se vuelve a cobrar la digitalización cada vez. No se lo entregamos por defecto — tenerlo tiene un costo aparte que se cotiza como servicio de digitalización, aunque normalmente sale bastante más económico si además mandas a bordar la prenda con nosotros que si solo quieres el archivo. Si te interesa tener tu propia copia, coméntanoslo al hacer tu pedido.',
      },
      {
        id: 'degradados-muchos-colores',
        question: '¿Pueden bordar un logo con degradados o muchos colores?',
        answer:
          'El bordado trabaja con hilos de colores sólidos, no con degradados continuos como en una pantalla — un degradado real (transición suave de un color a otro) se interpreta y se aproxima con técnicas de sombreado en el ponchado, pero nunca va a verse idéntico a un degradado digital. Sí podemos bordar logos con varios colores sólidos sin problema; entre más colores y más cambios de hilo tenga el diseño, más tiempo de producción y en algunos casos más costo. Si tu logo tiene un degradado, te sugerimos antes de pedir revisar si conviene simplificarlo a colores planos, o si el estampado (que sí reproduce degradados con fidelidad) es mejor opción para ese diseño en particular — lo vemos juntos por WhatsApp.',
      },
    ],
  },
  {
    id: 'prendas',
    title: 'Prendas',
    items: [
      {
        id: 'bordan-prenda-propia',
        question: '¿Bordan prendas que yo llevo?',
        answer:
          'Sí, bordamos prendas que traigas tú mismo. En general, cuando un taller borda una prenda que no vendió él mismo, pide revisar antes el tipo de tela y su estado, porque no todos los tejidos ni todas las costuras aguantan bien el bastidor y la tensión del bordado. Escríbenos con fotos de la prenda y te confirmamos si tu caso aplica.',
      },
      {
        id: 'prenda-se-dana',
        question: '¿Qué pasa si la prenda que llevo se daña durante el bordado?',
        answer:
          'Si el daño es por un error nuestro, nos hacemos responsables. Si es por lo delicado del propio tejido (algo que puede pasar incluso trabajando bien, en telas finas o elásticas), te pedimos traer un pequeño margen extra — por ejemplo, si necesitas 100 piezas, trae un 5% más (5 piezas) para cubrir ese riesgo normal del proceso. Por eso, si aceptamos bordar una prenda tuya, primero la revisamos y te avisamos si el tejido tiene algún riesgo (por ejemplo, telas muy elásticas, muy delgadas o ya desgastadas) antes de empezar, no después.',
      },
      {
        id: 'tejidos-no-recomendados',
        question: '¿Qué prendas y tejidos NO se pueden bordar bien?',
        answer:
          'Hay tejidos que dan problemas reales al bordar: las telas muy elásticas o de punto suelto (como algunos licrados finos) tienden a fruncirse o deformarse alrededor del bordado si no se refuerzan con una entretela o respaldo especial. Las telas impermeables o con laminado (rompevientos, algunos softshell) quedan perforadas por la aguja en cada punto, lo que puede afectar la impermeabilidad de esa zona. El cuero, el vinil grueso y algunos sintéticos muy rígidos tampoco son ideales para bordado tradicional. En todos estos casos solemos recomendar estampado en lugar de bordado, o un tipo de respaldo específico — te lo indicamos al revisar tu prenda o el tipo de tela que planeas usar.',
      },
      {
        id: 'venden-la-prenda',
        question: '¿Venden ustedes la prenda o solo bordan?',
        answer:
          'Las dos cosas. Tenemos catálogo propio de prendas en blanco (polos, camisetas, gorras, chompas, mandiles, bolsos y más) listas para personalizar con bordado, estampado o sublimado — puedes ver el catálogo completo en la web y armar tu pedido ahí mismo. Y también podemos bordar sobre prendas que ya tienes, cuando aplica (ver la pregunta anterior).',
      },
    ],
  },
  {
    id: 'tiempos-y-entrega',
    title: 'Tiempos y entrega',
    items: [
      {
        id: 'cuanto-tarda',
        question: '¿Cuánto tarda un pedido?',
        answer:
          'Al ser productos personalizados hechos a pedido, el tiempo varía según la cantidad de piezas, la técnica y la complejidad del diseño — no es el mismo plazo para una gorra que para 50 camisetas con un logo de varios colores. Como referencia: pedidos pequeños suelen tomar unos 2 días hábiles, medianos alrededor de 4, y pedidos grandes hasta 7 días hábiles — pero siempre nos adaptamos si tienes una fecha límite específica. Te damos el tiempo estimado exacto de tu pedido en la cotización, antes de que confirmes.',
      },
      {
        id: 'entregas-urgentes',
        question: '¿Hacen entregas urgentes?',
        answer:
          'Depende de la carga de producción que tengamos en ese momento y de la cantidad de piezas que necesites. Si tu fecha es ajustada, dínoslo apenas nos escribas por WhatsApp — así te confirmamos de una vez si es posible y si implica algún ajuste en el plazo o el proceso, en vez de que lo descubras a mitad de la producción.',
      },
      {
        id: 'envios-otras-ciudades',
        question: '¿Envían a otras ciudades?',
        answer:
          'Sí. Puedes retirar tu pedido en nuestro local en Guayaquil o coordinamos el envío a cualquier ciudad del Ecuador por el medio que prefieras (courier, encomienda, etc.). El costo de envío se cotiza aparte, según el destino y el tamaño del pedido, y no está incluido en el precio de la prenda.',
      },
    ],
  },
  {
    id: 'precios-y-pagos',
    title: 'Precios y pagos',
    items: [
      {
        id: 'de-que-depende-precio',
        question: '¿De qué depende el precio de un bordado?',
        answer:
          'De varios factores juntos: el tamaño del diseño (a más puntadas, más hilo y más tiempo de máquina), la cantidad de colores y cambios de hilo, el tipo y la ubicación de la prenda, la cantidad de piezas del pedido (por volumen baja el precio unitario) y si hace falta digitalizar el logo por primera vez. Dos logos del mismo tamaño pueden costar distinto si uno tiene el doble de puntadas por ser más detallado. Te explicamos en detalle este cálculo en nuestro artículo del blog "De qué depende el precio de un bordado".',
      },
      {
        id: 'mas-colores-mas-precio',
        question: '¿Cobran más por más colores de hilo?',
        answer:
          'El color en sí no tiene costo adicional — usar hilo azul no cuesta más que usar hilo rojo. Lo que sí puede subir el precio es la cantidad de cambios de hilo que exige el diseño: cada vez que la máquina tiene que detenerse para cambiar de color se suma tiempo de producción. Un logo de un solo color siempre va a ser más rápido (y por lo tanto más económico) que uno con seis colores distintos, aunque el tamaño sea el mismo.',
      },
      {
        id: 'piden-anticipo',
        question: '¿Piden anticipo?',
        answer:
          'Sí. Para iniciar la producción de un pedido personalizado pedimos un abono del 50%, y el saldo se cancela contra entrega. Aceptamos transferencia, depósito o efectivo (efectivo solo en el local) — todo se coordina por WhatsApp una vez que confirmas tu pedido.',
      },
    ],
  },
  {
    id: 'calidad-y-muestras',
    title: 'Calidad y muestras',
    items: [
      {
        id: 'ver-muestra-antes',
        question: '¿Puedo ver una muestra antes de la producción completa?',
        answer:
          'Antes de bordar el pedido completo puedes pedir que te mandemos una foto o video del bordado de prueba sobre la prenda real (no solo el diseño en pantalla), para que apruebes cómo se ve en tela antes de que sigamos con el resto de piezas. Es la forma más segura de evitar sorpresas en un pedido grande.',
      },
      {
        id: 'no-quedo-como-esperaba',
        question: '¿Qué pasa si el bordado no queda como esperaba?',
        answer:
          'Si el diseño final ("arte") fue aprobado por ti antes de producir y el bordado se hizo tal cual ese arte aprobado, no aplica cambio por gusto personal una vez iniciada la producción — por eso insistimos en que revises bien la vista previa antes de aprobarla. Ahora, si hay un defecto de fabricación real (por ejemplo, el bordado no corresponde al diseño aprobado, o hay una falla de materiales), lo corregimos o reponemos sin costo adicional, siempre que lo reportes dentro de las 48 horas siguientes a la entrega y la prenda esté en su estado original, sin uso ni lavado. Este es el mismo criterio que está en nuestros Términos y Condiciones.',
      },
      {
        id: 'se-destine-o-deshilacha',
        question: '¿El bordado se destiñe o se deshilacha al lavar?',
        answer:
          'Un bordado bien hecho, con hilo de buena calidad y lavado siguiendo las recomendaciones básicas (del revés, agua fría o tibia, sin plancha directa sobre el bordado), dura años sin perder color ni forma. Lo que sí puede pasar con cualquier bordado, del taller que sea, es que un hilo suelto se enganche con algo — en ese caso nunca se debe tirar del hilo, solo cortarlo al ras con una tijera. Tienes el detalle completo en nuestro artículo "Cómo cuidar una prenda bordada para que dure años".',
      },
    ],
  },
];

export const FAQ_ALL_ITEMS: (FaqItem & { categoryId: string; categoryTitle: string })[] = FAQ_CATEGORIES.flatMap(
  (cat) => cat.items.map((item) => ({ ...item, categoryId: cat.id, categoryTitle: cat.title })),
);
