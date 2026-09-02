export type Categoria = 'antes-de-pedir' | 'tecnica' | 'cuidados' | 'para-empresas';

export const CATEGORIA_LABEL: Record<Categoria, string> = {
  'antes-de-pedir': 'Antes de pedir',
  tecnica: 'Técnica',
  cuidados: 'Cuidados',
  'para-empresas': 'Para empresas',
};

export type ContentBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string; id: string }
  | { type: 'ul'; items: string[] }
  | { type: 'callout'; kind: 'consejo' | 'advertencia' | 'dato'; text: string }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'link'; label: string; description: string; href: string };

export interface InternalLink {
  texto: string;
  href: string;
}

export interface BlogPost {
  slug: string;
  titulo: string;
  categoria: Categoria;
  extracto: string;
  tiempoLectura: number;
  fecha: string;
  autor: string;
  metaTitulo: string;
  metaDescripcion: string;
  destacado?: boolean;
  cuerpo: ContentBlock[];
  relacionados: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'bordado-vs-estampado',
    titulo: 'Bordado vs. estampado: cuál te conviene según lo que vayas a hacer',
    categoria: 'antes-de-pedir',
    extracto:
      'No hay una técnica "mejor" en absoluto — hay una mejor para tu caso. Comparamos durabilidad, costo, tejidos y tacto para que elijas con criterio, no a la moneda.',
    tiempoLectura: 7,
    fecha: '2026-02-03',
    autor: 'Equipo Alburqtex',
    metaTitulo: 'Bordado vs. estampado: cuál conviene para tu pedido',
    metaDescripcion:
      'Comparación honesta entre bordado y estampado: durabilidad, costo por unidad, tejidos, colores y en qué casos gana cada técnica.',
    destacado: true,
    relacionados: ['que-archivo-necesito', 'de-que-depende-el-precio', 'bordado-en-gorras'],
    cuerpo: [
      {
        type: 'p',
        text: 'Es la primera pregunta que nos hacen casi todos los que nos escriben por primera vez: "¿me conviene bordado o estampado?". La respuesta corta es que depende de tu diseño, tu tejido y para qué va a usarse la prenda — no hay una técnica objetivamente superior. Esto es lo que sí podemos decirte con honestidad, sin venderte la que más nos convenga a nosotros.',
      },
      { type: 'h2', text: 'Durabilidad: el bordado gana casi siempre', id: 'durabilidad' },
      {
        type: 'p',
        text: 'El bordado es hilo cosido físicamente en la tela — mientras la costura aguante, el diseño aguanta. Un bordado bien hecho resiste años de lavadas sin perder forma ni color. El estampado, en cambio, es tinta o vinilo aplicado sobre la superficie de la tela: con el tiempo, el roce y los lavados repetidos pueden opacarlo, agrietarlo o hacer que se despegue en los bordes, sobre todo si es de mala calidad o se plancha directo encima.',
      },
      {
        type: 'p',
        text: 'Si la prenda es para uso diario e intensivo — uniforme de trabajo, ropa que se lava seguido — el bordado suele durar más tiempo con mejor aspecto.',
      },
      { type: 'h2', text: 'Costo por unidad según la cantidad', id: 'costo' },
      {
        type: 'p',
        text: 'Aquí la relación se invierte según el volumen. El bordado tiene un costo de digitalización (ponchado) que se paga una sola vez por diseño, y después cada prenda se borda a un ritmo relativamente fijo de la máquina — así que en pedidos grandes con el mismo diseño, el costo por unidad baja, pero nunca baja tanto como el estampado en volumen alto. El estampado, especialmente en serigrafía, tiene también un costo de preparación (el "quemado" de la malla o plancha), pero una vez montado, imprimir cientos de piezas iguales es más rápido y económico por unidad que bordarlas una por una.',
      },
      {
        type: 'callout',
        kind: 'dato',
        text: 'Regla general: para 1 a 20 piezas, el bordado suele ser competitivo. Para cientos de piezas idénticas, el estampado en volumen normalmente sale más barato por unidad — aunque siempre depende del tamaño y la complejidad del diseño.',
      },
      { type: 'h2', text: 'Tipos de tejido', id: 'tejidos' },
      {
        type: 'p',
        text: 'El bordado necesita una tela que aguante la tensión del bastidor y el paso de la aguja sin deformarse — funciona excelente en piqué, jersey, gabardina y denim. En tejidos muy elásticos, impermeables o de punto suelto, el bordado puede fruncir la tela o perforar una membrana que debía quedar cerrada (revisa nuestra guía de tallas y tejidos para el detalle completo). El estampado, en cambio, se adapta mejor a telas delicadas, elásticas o técnicas donde bordar sería un problema.',
      },
      { type: 'h2', text: 'Cantidad de colores y detalle', id: 'colores' },
      {
        type: 'p',
        text: 'El estampado reproduce fotografías, degradados y detalles finísimos con fidelidad total — es la técnica correcta para un diseño con transición de color continua o texto muy pequeño y delicado. El bordado trabaja con hilos de colores sólidos: un degradado se aproxima con sombreado, pero nunca se ve idéntico a la imagen digital original. Si tu logo tiene muchos colores o detalles muy finos, hablemos antes de decidir la técnica — a veces conviene simplificar el diseño para bordado, y a veces el estampado es simplemente la mejor opción.',
      },
      { type: 'h2', text: 'Sensación al tacto', id: 'tacto' },
      {
        type: 'p',
        text: 'El bordado tiene relieve — se siente y se ve la textura del hilo, lo que da un aspecto más premium y artesanal, típico de uniformes corporativos y ropa ejecutiva. El estampado queda plano sobre la tela (salvo el vinil texturizado o el estampado en alto relieve), con un tacto más suave, más asociado a streetwear y ropa casual o deportiva.',
      },
      { type: 'h2', text: 'Entonces, ¿cuál elijo?', id: 'cual-elegir' },
      {
        type: 'ul',
        items: [
          'Elige bordado si: es un uniforme de uso diario, buscas un aspecto corporativo/premium, el diseño tiene pocos colores sólidos y el tejido lo permite (piqué, gabardina, jersey grueso).',
          'Elige estampado si: el diseño tiene degradados o muchos colores/detalles finos, el pedido es de volumen alto, la tela es elástica o técnica, o buscas un acabado plano tipo streetwear.',
        ],
      },
      {
        type: 'p',
        text: 'Si tienes dudas con tu caso específico, mándanos tu logo y cuéntanos en qué prenda va — te damos nuestra recomendación honesta, aunque a veces eso signifique decirte que la otra técnica te conviene más.',
      },
    ],
  },
  {
    slug: 'que-archivo-necesito',
    titulo: 'Qué archivo necesito para bordar mi logo',
    categoria: 'antes-de-pedir',
    extracto:
      'Vectorial, mapa de bits, DST, EMB... si nunca has mandado un logo a bordar, esto aclara qué formato enviar y por qué una captura de WhatsApp casi nunca sirve.',
    tiempoLectura: 6,
    fecha: '2026-02-10',
    autor: 'Equipo Alburqtex',
    metaTitulo: 'Qué archivo enviar para bordar tu logo',
    metaDescripcion:
      'Diferencia entre archivo vectorial y de bordado, formatos aceptados, por qué una captura de pantalla no sirve, y qué hacer si solo tienes el logo en JPG.',
    relacionados: ['que-es-el-ponchado', 'bordado-vs-estampado'],
    cuerpo: [
      {
        type: 'p',
        text: 'Uno de los primeros mensajes que recibimos de un cliente nuevo suele venir con una captura de pantalla del logo tomada del sitio web de su empresa, o una foto de una tarjeta de presentación. Se entiende — nadie fuera de la industria textil sabe qué archivo hace falta para bordar, y no tiene por qué saberlo. Aquí te lo explicamos simple.',
      },
      { type: 'h2', text: 'Dos mundos distintos: tu logo y el archivo de bordado', id: 'dos-mundos' },
      {
        type: 'p',
        text: 'Primero, una aclaración importante: el archivo que tú nos mandas (tu logo) y el archivo con el que borda la máquina son dos cosas completamente diferentes. Tu logo es una imagen. El archivo de bordado es una secuencia de instrucciones de puntada — tipo de puntada, dirección, orden, densidad — que se genera a partir de tu logo mediante un proceso llamado digitalización o ponchado (tienes el detalle completo en nuestro artículo sobre el ponchado). Lo que nos tienes que mandar es la imagen; nosotros nos encargamos de convertirla.',
      },
      { type: 'h2', text: 'Vectorial vs. mapa de bits', id: 'vectorial-vs-mapa-de-bits' },
      {
        type: 'p',
        text: 'Un archivo vectorial (AI, EPS, PDF o SVG) describe el logo con líneas y formas matemáticas, así que se puede agrandar o achicar sin perder nitidez — es el formato ideal porque facilita muchísimo el trabajo de digitalización y deja ver con claridad dónde empieza y termina cada color y cada forma. Un mapa de bits (JPG, PNG) es una cuadrícula de píxeles: si la imagen es pequeña o está comprimida, al ampliarla se ve borrosa o "pixelada", y eso complica identificar bordes y detalles finos.',
      },
      {
        type: 'table',
        headers: ['Formato', 'Tipo', '¿Sirve para digitalizar?'],
        rows: [
          ['AI / EPS / PDF (vectorial)', 'Vectorial', 'Ideal — el mejor punto de partida'],
          ['SVG', 'Vectorial', 'Muy bueno'],
          ['PNG grande, sin comprimir', 'Mapa de bits', 'Bueno, si tiene buena resolución'],
          ['JPG de buena calidad', 'Mapa de bits', 'Aceptable'],
          ['Captura de pantalla / foto de celular', 'Mapa de bits comprimido', 'Solo como referencia, no como archivo final'],
        ],
      },
      { type: 'h2', text: 'Por qué una captura de WhatsApp casi nunca sirve', id: 'captura-whatsapp' },
      {
        type: 'p',
        text: 'WhatsApp comprime las imágenes para que pesen menos y se envíen rápido — eso reduce la resolución y genera artefactos alrededor de los bordes y el texto. Sumado a que muchas veces la captura ya viene de una imagen pequeña en primer lugar (el logo del pie de página de una web, por ejemplo), el resultado es un archivo que se ve bien en la pantalla de un celular pero que pierde demasiado detalle para digitalizar con precisión, sobre todo si el logo tiene texto pequeño o líneas finas.',
      },
      {
        type: 'callout',
        kind: 'consejo',
        text: 'Si tu logo lo diseñó alguien (un diseñador gráfico, una agencia), pregúntale por el archivo "fuente" o vectorial original — casi siempre existe, aunque tú solo hayas visto el PNG final.',
      },
      { type: 'h2', text: 'Resolución mínima si solo tienes una imagen', id: 'resolucion-minima' },
      {
        type: 'p',
        text: 'Si no tienes vectorial, mándanos la imagen más grande y menos comprimida que consigas — mientras más grande en píxeles, mejor podemos trabajar los detalles. Como referencia general, para un logo que va a bordarse a un tamaño de unos 10 cm de ancho, una imagen de al menos 1000–1500 píxeles de ancho ya da un buen punto de partida.',
      },
      { type: 'h2', text: 'Qué hacer si solo tienes el logo en JPG pequeño', id: 'solo-jpg-pequeno' },
      {
        type: 'p',
        text: 'No es el fin del mundo. Muchas veces podemos reconstruir el logo a partir de una imagen de baja calidad, sobre todo si es un diseño simple (texto + un ícono, formas geométricas). Puede tomar un poco más de tiempo en digitalización, pero es un caso que resolvemos seguido — mándanos lo que tengas y te decimos si funciona directo o si hace falta reconstruirlo.',
      },
      {
        type: 'p',
        text: 'En resumen: vectorial si lo tienes, imagen grande y nítida si no, y una foto de referencia solo como apoyo — nunca como archivo final. Con eso ya podemos empezar a cotizar tu bordado.',
      },
      {
        type: 'link',
        label: 'Más preguntas sobre archivos y diseño',
        description: 'Degradados, muchos colores, si el archivo digitalizado queda a tu nombre y más, en nuestras preguntas frecuentes.',
        href: '/preguntas-frecuentes#que-archivo-enviar',
      },
    ],
  },
  {
    slug: 'que-es-el-ponchado',
    titulo: 'Qué es el ponchado y por qué se cobra aparte',
    categoria: 'tecnica',
    extracto:
      'Es la pregunta que más genera confusión en la primera cotización: por qué hay un costo extra si "solo es bordar mi logo". Aquí explicamos qué es exactamente ese trabajo.',
    tiempoLectura: 6,
    fecha: '2026-02-17',
    autor: 'Equipo Alburqtex',
    metaTitulo: 'Qué es el ponchado (digitalización) en bordado',
    metaDescripcion:
      'Explicamos qué es la digitalización o ponchado de un logo para bordar, por qué es un trabajo manual, y por qué se cobra como un costo aparte, una sola vez.',
    relacionados: ['que-archivo-necesito', 'de-que-depende-el-precio'],
    cuerpo: [
      {
        type: 'p',
        text: '"¿Por qué me cobran algo aparte si solo quiero bordar mi logo?" — es de las preguntas más comunes que recibimos, y con toda razón: si nunca has estado del otro lado de una máquina de bordar, no hay forma de saber que digitalizar un logo es en realidad un trabajo de diseño en sí mismo, no un simple clic de "convertir".',
      },
      { type: 'h2', text: 'La máquina no entiende imágenes, entiende puntadas', id: 'la-maquina-no-entiende-imagenes' },
      {
        type: 'p',
        text: 'Una máquina de bordar no "lee" tu logo como lo ves tú en pantalla. Necesita un archivo de instrucciones muy específico: en qué punto exacto entra la aguja, en qué dirección corre cada línea de puntadas, en qué orden se borda cada sección, cuándo cambia de color, cuánta densidad de hilo lleva cada área. A ese proceso de traducir una imagen a esas instrucciones se le llama digitalización o ponchado.',
      },
      { type: 'h2', text: 'Por qué es trabajo manual, no automático', id: 'por-que-es-manual' },
      {
        type: 'p',
        text: 'Existen programas que hacen una conversión automática, pero el resultado casi nunca queda bien sin que una persona revise y ajuste cada decisión: el tipo de puntada correcto para cada forma (relleno, contorno, satín), la dirección del hilo para que el bordado se vea limpio y no "raro" bajo la luz, cómo resolver un texto muy pequeño sin que las letras se amontonen, cómo evitar que colores muy juntos se mezclen mal, y en qué orden bordar para que la prenda no se deforme durante el proceso. Todo eso es criterio humano, basado en experiencia — es diseño para bordado, no una simple conversión de formato.',
      },
      {
        type: 'callout',
        kind: 'dato',
        text: 'Un digitalizador con experiencia puede anticipar problemas que ni se notan en la pantalla — por ejemplo, que un detalle se va a "cerrar" y verse como una mancha una vez bordado a tamaño real, aunque en el diseño digital se vea perfecto.',
      },
      { type: 'h2', text: 'Por qué se cobra aparte, y solo una vez', id: 'por-que-se-cobra-aparte' },
      {
        type: 'p',
        text: 'El ponchado es un costo de diseño, independiente de cuántas prendas vayas a bordar con ese mismo diseño — por eso se cobra como un valor único, separado del precio por prenda. Lo pagas la primera vez que ese logo específico se digitaliza, y desde ahí guardamos el archivo: si vuelves a pedir con el mismo diseño (una reposición, personal nuevo, otra temporada), esa parte ya no se vuelve a cobrar, solo la prenda y el bordado.',
      },
      { type: 'h2', text: 'Qué pasa si cambias el tamaño del logo', id: 'que-pasa-si-cambias-el-tamano' },
      {
        type: 'p',
        text: 'Un archivo de bordado no se "estira" como una imagen digital sin consecuencias. Si el cambio de tamaño es pequeño, a veces se puede escalar el mismo archivo sin problema. Pero si el cambio es grande (por ejemplo, de un logo de 5 cm en una gorra a uno de 25 cm en la espalda de una chompa), la densidad de puntada que se veía bien en un tamaño puede verse mal en otro — muy apretada si se achica mucho, o con huecos si se agranda demasiado — y hay que volver a digitalizar ajustado a ese nuevo tamaño. Te avisamos si tu caso necesita eso antes de cobrarte por algo que no hacía falta.',
      },
      { type: 'h2', text: 'Qué debes recibir al terminar', id: 'que-debes-recibir' },
      {
        type: 'p',
        text: 'Al final del proceso, lo importante para ti es el resultado: tu logo bordado con fidelidad sobre la prenda. El archivo de puntadas en sí (en formatos como DST, EMB o PES) queda guardado de nuestro lado para futuros pedidos tuyos — si quieres saber más sobre la disponibilidad de ese archivo para ti, lo aclaramos en nuestras preguntas frecuentes.',
      },
      {
        type: 'p',
        text: 'En resumen: el ponchado no es un cobro extra arbitrario, es el trabajo de diseño que hace posible que tu logo se vea bien en tela — y es una inversión que haces una sola vez por diseño, no en cada pedido.',
      },
    ],
  },
  {
    slug: 'de-que-depende-el-precio',
    titulo: 'De qué depende el precio de un bordado',
    categoria: 'antes-de-pedir',
    extracto:
      'Dos logos "del mismo tamaño" pueden costar distinto. Desglosamos, con un ejemplo trabajado paso a paso, qué factores realmente mueven el precio de un bordado.',
    tiempoLectura: 7,
    fecha: '2026-02-24',
    autor: 'Equipo Alburqtex',
    metaTitulo: 'De qué depende el precio de un bordado — guía con ejemplo',
    metaDescripcion:
      'Puntadas, tamaño, colores, tipo de prenda, volumen del pedido y urgencia: así se arma el precio real de un bordado, con un ejemplo paso a paso.',
    relacionados: ['que-es-el-ponchado', 'bordado-vs-estampado', 'uniformes-para-empresas'],
    cuerpo: [
      {
        type: 'p',
        text: 'Es una pregunta justa: si dos logos parecen "del mismo tamaño", ¿por qué uno cuesta más que otro? La respuesta es que el tamaño en centímetros es solo uno de varios factores que arman el precio final. Aquí los desglosamos todos, con un ejemplo real al final.',
      },
      { type: 'h2', text: 'Número de puntadas, no solo tamaño en cm', id: 'numero-de-puntadas' },
      {
        type: 'p',
        text: 'El factor que más pesa en el costo de bordado no es literalmente el ancho o alto del diseño, sino la cantidad de puntadas que necesita — y dos logos del mismo tamaño físico pueden tener una cantidad de puntadas muy distinta según el nivel de detalle. Un logo simple de un solo color relleno puede llevar 3.000 puntadas; un escudo detallado del mismo tamaño, con texto pequeño, líneas finas y varias formas, puede llevar 12.000 o más. Más puntadas significa más tiempo de máquina, y el tiempo de máquina es lo que se cobra.',
      },
      { type: 'h2', text: 'Cantidad de colores y cambios de hilo', id: 'cantidad-de-colores' },
      {
        type: 'p',
        text: 'El color en sí no cuesta más — hilo azul no es más caro que hilo blanco. Lo que sí suma tiempo (y por lo tanto costo) son los cambios de hilo: cada vez que el diseño pasa de un color a otro, la máquina tiene que detenerse para cambiar de carrete. Un logo de un solo color se borda de corrido; uno de seis colores implica varias pausas de cambio en cada pieza.',
      },
      { type: 'h2', text: 'Tipo y ubicación de la prenda', id: 'tipo-y-ubicacion' },
      {
        type: 'p',
        text: 'No todas las prendas se bastidoran (se montan en el marco de bordado) igual de rápido. Una gorra estructurada necesita un bastidor especial y más tiempo de montaje que una camiseta plana. Bordar en la espalda completa de una chompa toma más tiempo de preparación que un logo pequeño en el pecho. Todo eso se refleja en el costo por unidad.',
      },
      { type: 'h2', text: 'Volumen del pedido', id: 'volumen-del-pedido' },
      {
        type: 'p',
        text: 'El costo de digitalizar el logo (ver nuestro artículo sobre el ponchado) es un valor fijo, sin importar si bordas 1 pieza o 100. En un pedido grande, ese costo fijo se reparte entre más unidades, así que el precio por prenda baja. Por eso una sola pieza siempre cuesta más por unidad que la misma pieza dentro de un pedido de 50.',
      },
      { type: 'h2', text: 'Urgencia', id: 'urgencia' },
      {
        type: 'p',
        text: 'Si necesitas tu pedido con un plazo muy ajustado, a veces implica reorganizar la producción de otros pedidos o sumar horas extra de máquina — dependiendo de nuestra carga de trabajo en ese momento, eso puede reflejarse en el precio o el plazo disponible. Por eso siempre es mejor avisar la fecha límite desde el primer mensaje.',
      },
      { type: 'h2', text: 'Ejemplo trabajado paso a paso', id: 'ejemplo' },
      {
        type: 'p',
        text: 'Imaginemos un pedido de 15 polos corporativos, logo de dos colores en el pecho izquierdo, de una empresa que nunca nos ha pedido antes (o sea, el logo no está digitalizado todavía):',
      },
      {
        type: 'ul',
        items: [
          'Digitalización del logo (costo único, se paga una sola vez): se cotiza según la complejidad del diseño.',
          'Costo de bordado por unidad: depende de la cantidad de puntadas que resultó el logo digitalizado y de los dos cambios de color por pieza.',
          'Costo de la prenda (el polo en sí): según el tejido y el proveedor.',
          '15 unidades: el costo de digitalización se reparte entre las 15, así que pesa menos por pieza que si fuera una unidad sola.',
        ],
      },
      {
        type: 'p',
        text: 'Si ese mismo cliente vuelve en seis meses a pedir 10 polos más con el mismo logo (por ejemplo, para personal nuevo), el costo de digitalización ya no aplica — el precio por unidad de ese segundo pedido baja, porque solo se cobra prenda + bordado.',
      },
      {
        type: 'callout',
        kind: 'consejo',
        text: 'Si estás cotizando y el número te parece alto, pregunta específicamente cuánto corresponde a digitalización y cuánto al bordado en sí — te ayuda a entender que ese primer costo no se repite en tu próximo pedido con el mismo diseño.',
      },
      {
        type: 'p',
        text: 'Con todo esto en mente, la forma más rápida de saber el precio real de tu caso es mandarnos el logo y la cantidad de piezas que necesitas — te devolvemos una cotización desglosada, no un número sacado del aire.',
      },
      {
        type: 'link',
        label: 'Clientes y testimonios',
        description: 'Empresas, instituciones y particulares que ya cotizaron y bordaron con nosotros.',
        href: '/clientes',
      },
    ],
  },
  {
    slug: 'bordado-en-gorras',
    titulo: 'Bordado en gorras: lo que debes saber antes de pedir',
    categoria: 'tecnica',
    extracto:
      'Estructurada o no estructurada, plano o 3D — la gorra es de las prendas más pedidas y de las que más dudas generan. Esto es lo que hay que saber antes de diseñar el logo.',
    tiempoLectura: 6,
    fecha: '2026-03-03',
    autor: 'Equipo Alburqtex',
    metaTitulo: 'Bordado en gorras: guía antes de pedir',
    metaDescripcion:
      'Gorra estructurada vs. no estructurada, bordado plano vs. 3D, límites de tamaño en el frontal, y qué logos no funcionan bien en gorra.',
    relacionados: ['bordado-vs-estampado', 'guia-ubicaciones-bordado'],
    cuerpo: [
      {
        type: 'p',
        text: 'La gorra es de las prendas más pedidas para bordar — y también una de las que tiene más particularidades técnicas que vale la pena conocer antes de mandar tu diseño, porque no todo lo que funciona en una camiseta funciona igual en una gorra.',
      },
      { type: 'h2', text: 'Gorra estructurada vs. no estructurada', id: 'estructurada-vs-no-estructurada' },
      {
        type: 'p',
        text: 'Una gorra estructurada lleva una entretela rígida dentro del panel frontal que la mantiene firme y con forma, incluso sin nadie puesta — es el tipo clásico de gorra de béisbol o trucker con frente alto. Una gorra no estructurada no lleva ese refuerzo: es más suave, se dobla y se ajusta más a la forma de la cabeza, con un aire más casual. El bordado se ve distinto en cada una: en la estructurada, el frente firme da una superficie más plana y predecible para bordar; en la no estructurada, la superficie tiene más curva natural, así que un diseño muy grande o muy detallado puede deformarse un poco con el movimiento de la tela.',
      },
      { type: 'h2', text: 'Bordado plano vs. 3D en relieve', id: 'plano-vs-3d' },
      {
        type: 'p',
        text: 'El bordado plano es el bordado tradicional, sin relleno debajo — se ve nítido y funciona bien para logos con texto o detalles finos. El bordado 3D (o "puff") usa un relleno de espuma debajo del hilo para dar volumen y un efecto de relieve, muy popular en logos y letras grandes en el frontal de la gorra. El 3D se ve muy bien en formas simples y gruesas, pero pierde definición en detalles pequeños — un texto muy fino en 3D tiende a verse borroso o "inflado" en exceso, así que para diseños con mucho detalle recomendamos bordado plano.',
      },
      { type: 'h2', text: 'Límites de tamaño en el frontal', id: 'limites-de-tamano' },
      {
        type: 'p',
        text: 'El panel frontal de una gorra tiene un espacio útil limitado — normalmente hasta unos 11 × 6 cm aproximadamente, según el modelo (tienes el detalle completo, junto con las demás ubicaciones de bordado, en nuestra guía de tallas). Si tu logo es muy horizontal o muy vertical, puede que no entre completo en ese espacio sin achicarse demasiado — en esos casos solemos sugerir una versión simplificada del logo (por ejemplo, solo el ícono sin el texto) pensada específicamente para gorra.',
      },
      { type: 'h2', text: 'Qué logos no funcionan bien en gorra', id: 'que-no-funciona' },
      {
        type: 'ul',
        items: [
          'Texto muy fino o tipografías delgadas: a tamaño de gorra, las letras finas tienden a "cerrarse" y perder legibilidad.',
          'Degradados: como en cualquier bordado, un degradado continuo no se reproduce igual que en pantalla — en un espacio tan pequeño como el frontal de una gorra, la aproximación con hilo se nota todavía más.',
          'Logos muy horizontales o muy detallados: el espacio reducido del frontal obliga a simplificar o a mover el diseño a otra ubicación (lateral, parte trasera).',
        ],
      },
      {
        type: 'callout',
        kind: 'consejo',
        text: 'Si tu logo completo no cabe bien en el frontal, considera bordar solo el ícono o las iniciales ahí, y reservar el logo completo (con texto) para una prenda con más espacio, como el pecho de un polo.',
      },
      { type: 'h2', text: 'Ubicaciones alternativas en la gorra', id: 'ubicaciones-alternativas' },
      {
        type: 'p',
        text: 'El frontal no es la única opción. El lateral de la gorra es un buen espacio para un ícono pequeño o unas iniciales. La parte trasera, cerca del cierre ajustable, funciona bien para un texto corto (un eslogan, una fecha, una URL). Combinar, por ejemplo, el ícono en el frontal y un texto pequeño en el lateral, suele verse mejor que forzar todo el logo completo en un solo espacio reducido.',
      },
      {
        type: 'p',
        text: 'Si tienes un logo en mente para gorra y no estás seguro de si va a funcionar bien a ese tamaño, mándanoslo — te decimos de una vez si va directo o si conviene una versión adaptada.',
      },
      {
        type: 'link',
        label: 'Ver gorras bordadas reales',
        description: 'Ejemplos de gorras con bordado plano, 3D y aplique en nuestra galería de trabajos.',
        href: '/galeria?prenda=gorras',
      },
    ],
  },
  {
    slug: 'cuidar-prenda-bordada',
    titulo: 'Cómo cuidar una prenda bordada para que dure años',
    categoria: 'cuidados',
    extracto:
      'El bordado en sí es duradero, pero el cuidado en casa hace la diferencia entre que se vea nuevo dos años después o que se estropee en pocos lavados.',
    tiempoLectura: 5,
    fecha: '2026-03-10',
    autor: 'Equipo Alburqtex',
    metaTitulo: 'Cómo cuidar una prenda bordada — guía de lavado',
    metaDescripcion:
      'Lavado del revés, temperatura, planchado sin dañar el bordado, secado correcto y qué hacer si sale un hilo suelto.',
    relacionados: ['bordado-vs-estampado'],
    cuerpo: [
      {
        type: 'p',
        text: 'Un bordado bien hecho, con hilo de calidad, dura años — pero el cuidado en casa influye tanto como la calidad del bordado mismo. Estos son los cuidados básicos, sin complicaciones, para que tu prenda se siga viendo bien lavado tras lavado.',
      },
      { type: 'h2', text: 'Lava del revés', id: 'lava-del-reves' },
      {
        type: 'p',
        text: 'Voltea la prenda antes de meterla a la lavadora. Así el bordado queda protegido del roce directo contra otras prendas, cierres o superficies dentro del tambor, que es la causa más común de que el hilo se vea "peludo" o pierda brillo con el tiempo.',
      },
      { type: 'h2', text: 'Agua fría o tibia, nunca caliente', id: 'temperatura' },
      {
        type: 'p',
        text: 'El agua muy caliente puede hacer que algunos hilos pierdan color más rápido y que la tela base se encoja de forma distinta al bordado, generando tensión y arrugas alrededor del diseño. Agua fría o tibia es suficiente para lavar una prenda bordada sin ese riesgo.',
      },
      { type: 'h2', text: 'Plancha evitando el bordado', id: 'planchado' },
      {
        type: 'p',
        text: 'Nunca planches directo sobre un bordado a temperatura alta — el calor y la presión pueden aplastar el relieve del hilo o, en el peor caso, derretir hilos sintéticos. Si necesitas planchar cerca del área bordada, hazlo del revés, o coloca un paño fino entre la plancha y el bordado como protección.',
      },
      { type: 'h2', text: 'Secado', id: 'secado' },
      {
        type: 'p',
        text: 'El secado al aire libre, a la sombra, es lo más seguro para cualquier prenda bordada. Si usas secadora, un ciclo de temperatura baja o media reduce el riesgo de que el calor afecte el hilo o encoja la tela de forma despareja alrededor del diseño.',
      },
      { type: 'h2', text: 'Si sale un hilo suelto: nunca tirar, cortar al ras', id: 'hilo-suelto' },
      {
        type: 'p',
        text: 'Es lo más importante de esta guía, y lo que más prendas bordadas arruina sin necesidad: si notas un hilo suelto o enganchado, jamás tires de él. Un bordado está hecho de puntadas conectadas — tirar de un hilo suelto puede deshacer varias puntadas en cadena y arruinar el diseño en segundos. Lo correcto es tomar una tijera pequeña y cortar el hilo suelto al ras de la tela, dejando el resto del bordado intacto.',
      },
      {
        type: 'callout',
        kind: 'advertencia',
        text: 'Nunca tires de un hilo suelto en un bordado. Corta al ras con tijera. Es la diferencia entre perder un milímetro de hilo o perder el diseño completo.',
      },
      { type: 'h2', text: 'Resumen rápido', id: 'resumen' },
      {
        type: 'ul',
        items: [
          'Lava del revés.',
          'Agua fría o tibia, no caliente.',
          'Plancha evitando el bordado o del revés, con paño de protección.',
          'Seca a la sombra o en ciclo bajo de secadora.',
          'Hilo suelto: se corta, nunca se tira.',
        ],
      },
      {
        type: 'p',
        text: 'Con estos cuidados básicos, una prenda bordada bien hecha te acompaña por años sin perder su forma ni su color.',
      },
      {
        type: 'link',
        label: 'Ver trabajos terminados',
        description: 'Ejemplos reales de bordado en distintas prendas y tejidos, con el detalle de cada trabajo.',
        href: '/galeria',
      },
    ],
  },
  {
    slug: 'guia-ubicaciones-bordado',
    titulo: 'Guía de ubicaciones de bordado: dónde poner tu logo y por qué',
    categoria: 'tecnica',
    extracto:
      'Pecho izquierdo, espalda completa, manga, cuello posterior... cada ubicación comunica algo distinto y tiene su propio límite de tamaño. Aquí el recorrido completo.',
    tiempoLectura: 6,
    fecha: '2026-03-17',
    autor: 'Equipo Alburqtex',
    metaTitulo: 'Dónde ubicar el bordado de tu logo — guía completa',
    metaDescripcion:
      'Recorrido por cada ubicación habitual de bordado (pecho, espalda, manga, gorra) con su medida máxima y qué comunica cada una.',
    relacionados: ['bordado-en-gorras', 'de-que-depende-el-precio'],
    cuerpo: [
      {
        type: 'p',
        text: 'Dónde va el bordado en una prenda no es solo una decisión estética — cada ubicación tiene un límite de tamaño distinto y comunica algo diferente. Este es el recorrido completo de las ubicaciones más comunes (tienes las medidas exactas también en nuestra guía de tallas).',
      },
      { type: 'h2', text: 'Pecho izquierdo', id: 'pecho-izquierdo' },
      {
        type: 'p',
        text: 'La ubicación más clásica para un logo corporativo — discreta, profesional, y es donde el ojo va naturalmente en un saludo de mano o una conversación de pie. Tamaño máximo de referencia: unos 10 × 10 cm. Es la opción por defecto para uniformes de oficina, personal de atención al cliente y ropa ejecutiva.',
      },
      { type: 'h2', text: 'Pecho centrado', id: 'pecho-centrado' },
      {
        type: 'p',
        text: 'Un logo más grande, centrado en el pecho, tiene más presencia visual — comunica marca de forma más directa, típico en camisetas de eventos, equipos deportivos o merchandising. Tamaño máximo de referencia: unos 20 × 20 cm.',
      },
      { type: 'h2', text: 'Espalda completa', id: 'espalda-completa' },
      {
        type: 'p',
        text: 'La ubicación de mayor impacto visual — se ve de lejos y es ideal cuando quieres que el logo sea lo primero que alguien note, por ejemplo en personal de seguridad, delivery o staff de un evento donde la visibilidad importa. Tamaño máximo de referencia: unos 30 × 35 cm. También es la ubicación con más tiempo de bordado por el tamaño, así que suele influir más en el precio.',
      },
      { type: 'h2', text: 'Manga', id: 'manga' },
      {
        type: 'p',
        text: 'Un detalle pequeño en la manga (un ícono, unas iniciales) es un toque discreto que no compite con el logo principal en el pecho — común en camisas de vestir o polos donde ya hay un logo al frente y se quiere un segundo detalle sutil. Tamaño máximo de referencia: unos 8 × 8 cm.',
      },
      { type: 'h2', text: 'Cuello posterior', id: 'cuello-posterior' },
      {
        type: 'p',
        text: 'Justo debajo del cuello, por dentro o por fuera — un espacio pequeño, ideal para una marca de agua discreta, una talla, o el nombre de la empresa en texto pequeño. Tamaño máximo de referencia: unos 12 × 4 cm.',
      },
      { type: 'h2', text: 'Gorra: frontal, lateral y cierre trasero', id: 'gorra' },
      {
        type: 'p',
        text: 'La gorra tiene tres zonas independientes: el frontal (la más visible, hasta unos 11 × 6 cm — tienes el detalle completo en nuestro artículo sobre bordado en gorras), el lateral (más pequeño, hasta unos 6 × 4 cm, bueno para un ícono o iniciales) y el cierre trasero (una franja angosta, hasta unos 10 × 3 cm, ideal para un texto corto).',
      },
      {
        type: 'table',
        headers: ['Ubicación', 'Medida máxima de referencia', 'Se usa para'],
        rows: [
          ['Pecho izquierdo', '10 × 10 cm', 'Logo corporativo discreto'],
          ['Pecho centrado', '20 × 20 cm', 'Marca con más presencia'],
          ['Espalda completa', '30 × 35 cm', 'Máximo impacto visual'],
          ['Manga', '8 × 8 cm', 'Detalle secundario'],
          ['Cuello posterior', '12 × 4 cm', 'Marca de agua discreta'],
          ['Frontal de gorra', '11 × 6 cm', 'Logo principal en gorra'],
          ['Lateral de gorra', '6 × 4 cm', 'Ícono o iniciales'],
          ['Cierre de gorra', '10 × 3 cm', 'Texto corto'],
        ],
      },
      {
        type: 'callout',
        kind: 'dato',
        text: 'Estas medidas son de referencia — el espacio real disponible varía un poco según la prenda exacta y el bastidor. Te confirmamos la medida exacta para tu prenda al cotizar.',
      },
      {
        type: 'p',
        text: 'No hace falta elegir una sola ubicación: combinar, por ejemplo, un logo pequeño en el pecho con un texto en la manga, suele verse mejor que forzar todo en un solo lugar. Cuéntanos qué prenda tienes en mente y te ayudamos a decidir la ubicación que mejor comunica lo que buscas.',
      },
    ],
  },
  {
    slug: 'uniformes-para-empresas',
    titulo: 'Uniformes bordados para empresas: cómo planificar el pedido',
    categoria: 'para-empresas',
    extracto:
      'Un pedido de uniformes bien planificado ahorra reprocesos, tiempo y dinero. Cómo levantar el cuadro de tallas, cuánto margen de reposición dejar y cómo mantener el color idéntico entre lotes.',
    tiempoLectura: 7,
    fecha: '2026-03-24',
    autor: 'Equipo Alburqtex',
    metaTitulo: 'Cómo planificar un pedido de uniformes bordados para empresa',
    metaDescripcion:
      'Guía para empresas: cómo levantar el cuadro de tallas del personal, margen de reposición, plazos realistas y consistencia de color entre lotes.',
    relacionados: ['de-que-depende-el-precio', 'que-es-el-ponchado'],
    cuerpo: [
      {
        type: 'p',
        text: 'Un pedido de uniformes para empresa no es lo mismo que comprar una prenda para uno mismo — hay tallas de por medio, personal que rota, y la expectativa de que el uniforme se vea igual hoy que dentro de un año. Con un poco de planificación de tu lado, el proceso es mucho más fluido para todos.',
      },
      { type: 'h2', text: 'Levanta el cuadro de tallas antes de cotizar', id: 'cuadro-de-tallas' },
      {
        type: 'p',
        text: 'Antes de pedir la cotización, junta la talla real de cada persona que va a usar el uniforme — no la que "cree" que usa, sino la que le queda bien en una prenda similar que ya tenga. Un cuadro de tallas claro (nombre o número de empleado + talla) agiliza muchísimo la cotización y evita cambios de última hora que retrasan la producción. Nuestra guía de tallas te puede servir como referencia para que cada persona confirme su talla antes de mandarte la lista.',
      },
      {
        type: 'link',
        label: 'Guía de tallas y tipos de prenda',
        description: 'Tablas de referencia en cm y pulgadas para que cada persona de tu equipo confirme su talla antes de cotizar.',
        href: '/guia-de-tallas',
      },
      {
        type: 'callout',
        kind: 'consejo',
        text: 'Pide a cada persona que mida una prenda que ya le quede bien, en lugar de adivinar su talla de memoria — reduce muchísimo los cambios después de producido el pedido.',
      },
      { type: 'h2', text: 'Deja margen de reposición', id: 'margen-de-reposicion' },
      {
        type: 'p',
        text: 'Si tu empresa contrata personal nuevo con cierta frecuencia, conviene pedir algunas unidades adicionales a las que necesitas hoy — sobre todo en las tallas más comunes (M y L suelen ser las de mayor rotación). Así, cuando entra alguien nuevo, tienes uniforme disponible de inmediato en vez de esperar un pedido nuevo solo para una persona, que además sale más caro por unidad al no compartir el costo de digitalización con un pedido grande.',
      },
      { type: 'h2', text: 'Plazos realistas', id: 'plazos-realistas' },
      {
        type: 'p',
        text: 'Los pedidos de uniformes tienden a planificarse con más antelación que un pedido personal — hay más piezas, coordinación de tallas, y a veces aprobación interna del diseño antes de producir. Avísanos la fecha en que necesitas el uniforme desde el primer contacto, así podemos confirmarte de entrada si el plazo es viable o si hace falta ajustar algo (ver también nuestro artículo sobre qué mueve el precio de un bordado, que también toca el tema de plazos y urgencia).',
      },
      { type: 'h2', text: 'Cómo mantener el color idéntico entre lotes distintos', id: 'color-entre-lotes' },
      {
        type: 'p',
        text: 'Si tu empresa va a pedir uniformes en distintos momentos del año (o de los años), es normal preguntarse si el color del hilo y de la tela va a ser exactamente el mismo la segunda vez. Esto es lo que hacemos para minimizar esa diferencia:',
      },
      {
        type: 'ul',
        items: [
          'Guardamos el código de hilo exacto usado en tu primer pedido, no solo "el color que se veía parecido".',
          'El archivo de bordado digitalizado se reutiliza tal cual, sin rehacer el diseño desde cero.',
          'Cuando es posible, se solicita tela del mismo proveedor y referencia que el pedido anterior.',
        ],
      },
      {
        type: 'p',
        text: 'Aun así, es honesto decir que un lote de tela nuevo puede tener una variación mínima de tono frente al lote original — es una característica normal de la industria textil, no un error de producción. Si el color es un elemento crítico para tu marca, avísanos para prestarle especial atención a la comparación antes de producir el lote completo.',
      },
      { type: 'h2', text: 'Un pedido recurrente, más simple la segunda vez', id: 'pedido-recurrente' },
      {
        type: 'p',
        text: 'La buena noticia es que, una vez que hiciste tu primer pedido con nosotros, los siguientes son mucho más simples: el logo ya está digitalizado, ya sabemos tu talla de tejido y color preferido, y el proceso se reduce básicamente a confirmar cantidades y tallas nuevas. Planificar bien el primer pedido es lo que hace que todos los siguientes sean casi automáticos.',
      },
    ],
  },
];

export const BLOG_POSTS_BY_SLUG: Record<string, BlogPost> = Object.fromEntries(
  BLOG_POSTS.map((p) => [p.slug, p]),
);
