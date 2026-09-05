export type Prenda =
  | 'gorras'
  | 'polos'
  | 'camisetas'
  | 'camisas'
  | 'uniformes'
  | 'chompas'
  | 'mandiles'
  | 'bolsas'
  | 'toallas'
  | 'mochilas';
export type Tecnica =
  | 'plano'
  | '3d'
  | 'aplique'
  | 'parche'
  | 'monograma'
  | 'estampado'
  | 'sublimacion'
  | 'confeccion';
export type Sector =
  | 'restaurantes'
  | 'salud'
  | 'colegios'
  | 'hoteleria'
  | 'construccion'
  | 'gimnasios'
  | 'eventos'
  | 'particulares';

export const PRENDA_LABEL: Record<Prenda, string> = {
  gorras: 'Gorras',
  polos: 'Polos',
  camisetas: 'Camisetas',
  camisas: 'Camisas',
  uniformes: 'Uniformes',
  chompas: 'Chompas',
  mandiles: 'Mandiles',
  bolsas: 'Bolsas de tela',
  toallas: 'Toallas',
  mochilas: 'Mochilas',
};

export const TECNICA_LABEL: Record<Tecnica, string> = {
  plano: 'Bordado plano',
  '3d': 'Bordado 3D / relieve',
  aplique: 'Aplique',
  parche: 'Parche bordado',
  monograma: 'Monograma',
  estampado: 'Estampado textil',
  sublimacion: 'Sublimación',
  confeccion: 'Confección textil',
};

export const SECTOR_LABEL: Record<Sector, string> = {
  restaurantes: 'Restaurantes',
  salud: 'Salud',
  colegios: 'Colegios',
  hoteleria: 'Hotelería',
  construccion: 'Construcción',
  gimnasios: 'Gimnasios',
  eventos: 'Eventos',
  particulares: 'Particulares',
};

export interface GalleryPiece {
  id: string;
  titulo: string;
  prenda: Prenda;
  tecnica: Tecnica;
  sector: Sector;
  puntadasAprox?: number;
  coloresHilo?: number;
  detalleTecnico?: string;
  reto: string;
  /** Ruta pública de la fotografía o muestra visual. */
  imagen: string;
  /** Permite distinguir mockups realistas de fotografías de pedidos entregados. */
  esImagenReferencial: boolean;
  tieneAntesDespues?: boolean;
  imagenAntes?: string;
}

export const GALLERY_PIECES: GalleryPiece[] = [
  {
    id: 'camiseta-estampada-ilustracion',
    titulo: 'Camiseta estampada a todo color',
    prenda: 'camisetas',
    tecnica: 'estampado',
    sector: 'eventos',
    detalleTecnico: 'Estampado multicolor · algodón',
    reto:
      'Una ilustración con muchos colores y detalles finos necesitaba conservar contraste sobre una camiseta negra. Se preparó una base clara y se controló el registro de cada tono para lograr un acabado nítido y uniforme.',
    imagen: 'galeria/camiseta-estampada-ilustracion.jpg',
    esImagenReferencial: true,
  },
  {
    id: 'bolsas-estampadas-evento',
    titulo: 'Bolsas de tela estampadas para evento',
    prenda: 'bolsas',
    tecnica: 'estampado',
    sector: 'eventos',
    detalleTecnico: 'Estampado a una tinta · lona de algodón',
    reto:
      'El pedido requería que el mismo gráfico quedara centrado y consistente en todo el lote. Se ajustó la presión y la ubicación para mantener bordes limpios sobre la textura natural de la lona.',
    imagen: 'galeria/bolsas-estampadas-evento.jpg',
    esImagenReferencial: true,
  },
  {
    id: 'uniforme-futbol-sublimado',
    titulo: 'Uniforme de fútbol sublimado completo',
    prenda: 'uniformes',
    tecnica: 'sublimacion',
    sector: 'gimnasios',
    detalleTecnico: 'Sublimación total · poliéster deportivo',
    reto:
      'Camiseta y short debían compartir un diseño continuo y conservar intensidad de color. Se coordinó la impresión con los moldes antes del corte para alinear gráficos, dorsales y paneles en todas las tallas.',
    imagen: 'galeria/uniforme-futbol-sublimado.jpg',
    esImagenReferencial: true,
  },
  {
    id: 'jersey-ciclismo-sublimado',
    titulo: 'Jersey técnico con degradado sublimado',
    prenda: 'camisetas',
    tecnica: 'sublimacion',
    sector: 'gimnasios',
    detalleTecnico: 'Sublimación integral · tejido técnico',
    reto:
      'El degradado debía atravesar distintos paneles sin saltos visibles. La impresión se adaptó al patronaje para que el color se integrara a la fibra y las uniones conservaran continuidad.',
    imagen: 'galeria/jersey-ciclismo-sublimado.jpg',
    esImagenReferencial: true,
  },
  {
    id: 'confeccion-camisa-industrial',
    titulo: 'Confección de camisa para trabajo',
    prenda: 'camisas',
    tecnica: 'confeccion',
    sector: 'construccion',
    detalleTecnico: 'Patronaje, corte y costura reforzada',
    reto:
      'Se desarrolló una camisa resistente para jornadas de trabajo, cuidando movilidad, bolsillos funcionales y costuras de refuerzo. La pieza se construyó desde la tela y quedó lista para personalizar.',
    imagen: 'galeria/confeccion-camisa-industrial.jpg',
    esImagenReferencial: true,
  },
  {
    id: 'confeccion-uniforme-hosteleria',
    titulo: 'Uniforme de hostelería confeccionado a medida',
    prenda: 'uniformes',
    tecnica: 'confeccion',
    sector: 'restaurantes',
    detalleTecnico: 'Desarrollo de molde · acabados reforzados',
    reto:
      'La camisa y el mandil se diseñaron como un conjunto funcional y coherente. Se definieron telas, medidas, bolsillos y pespuntes para combinar una presentación cuidada con resistencia al uso diario.',
    imagen: 'galeria/confeccion-uniforme-hosteleria.jpg',
    esImagenReferencial: true,
  },
  {
    id: 'gorra-construccion-3d',
    titulo: 'Gorra trucker con logo en relieve',
    prenda: 'gorras',
    tecnica: '3d',
    sector: 'construccion',
    puntadasAprox: 8500,
    coloresHilo: 2,
    reto:
      'El logo original tenía texto muy fino para el tamaño del frontal de la gorra. Se engrosaron los trazos en la digitalización sin perder la proporción, y el relieve 3D le dio el volumen que pedía el cliente para que se viera bien de lejos, en obra.',
    imagen: 'galeria/gorra-trucker-relieve-3d-construccion.jpg',
    esImagenReferencial: true,
  },
  {
    id: 'polo-restaurante-mesero',
    titulo: 'Polo piqué para personal de sala',
    prenda: 'polos',
    tecnica: 'plano',
    sector: 'restaurantes',
    puntadasAprox: 4200,
    coloresHilo: 3,
    reto:
      'Pedido de 24 polos para un restaurante de mariscos en el centro de Guayaquil, con el mismo logo en pecho izquierdo para todo el personal de sala. El reto fue mantener el color del hilo idéntico entre dos lotes de tela distintos.',
    imagen: 'galeria/polo-pique-mesero-restaurante.jpg',
    esImagenReferencial: true,
  },
  {
    id: 'camisa-monograma-iniciales',
    titulo: 'Camisa con monograma personal',
    prenda: 'camisas',
    tecnica: 'monograma',
    sector: 'particulares',
    puntadasAprox: 900,
    coloresHilo: 1,
    reto:
      'Regalo de cumpleaños: iniciales bordadas en el puño de una camisa de vestir, en hilo tono sobre tono para que se notara solo de cerca. Trabajo de una sola pieza, sin mínimo de cantidad.',
    imagen: 'galeria/camisa-monograma-puno-iniciales.jpg',
    esImagenReferencial: true,
  },
  {
    id: 'chompa-clinica-parche',
    titulo: 'Chompa softshell con parche bordado',
    prenda: 'chompas',
    tecnica: 'parche',
    sector: 'salud',
    puntadasAprox: 6800,
    coloresHilo: 4,
    reto:
      'El tejido softshell es impermeable, así que bordar directo sobre la chompa hubiera perforado la membrana. Se bordó el logo de la clínica sobre un parche aparte y se aplicó por costura, así la prenda mantiene su función original.',
    imagen: 'galeria/chompa-softshell-parche-clinica.jpg',
    esImagenReferencial: true,
  },
  {
    id: 'mandil-cocina-nombre',
    titulo: 'Mandil de cocina con nombre y logo',
    prenda: 'mandiles',
    tecnica: 'plano',
    sector: 'restaurantes',
    puntadasAprox: 5100,
    coloresHilo: 2,
    reto:
      'Mandiles de cocina para un equipo de chefs, cada uno con su nombre bordado además del logo del restaurante. Se dejó un archivo base del logo digitalizado una sola vez, y cada nombre se bordó como texto individual.',
    imagen: 'galeria/mandil-cocina-nombre-chef.jpg',
    esImagenReferencial: true,
    tieneAntesDespues: true,
    imagenAntes: 'galeria/antes-logo-restaurante-original.jpg',
  },
  {
    id: 'toalla-hotel-iniciales',
    titulo: 'Toalla de mano con iniciales del hotel',
    prenda: 'toallas',
    tecnica: 'monograma',
    sector: 'hoteleria',
    puntadasAprox: 1400,
    coloresHilo: 1,
    reto:
      'Toallas de mano para un hotel boutique, con las iniciales bordadas en una esquina. El tejido de rizo es más difícil de bordar que una tela plana porque el hilo tiende a hundirse — se usó un respaldo soluble para que el bordado quedara parejo y firme.',
    imagen: 'galeria/toalla-mano-iniciales-hotel.jpg',
    esImagenReferencial: true,
  },
  {
    id: 'mochila-colegio-escudo',
    titulo: 'Mochila escolar con escudo institucional',
    prenda: 'mochilas',
    tecnica: 'plano',
    sector: 'colegios',
    puntadasAprox: 9600,
    coloresHilo: 5,
    reto:
      'El escudo de un colegio tiene varios elementos pequeños (letras, franjas, un ícono central) que hay que resolver bien en digitalización para que no se vean amontonados en un espacio reducido de la mochila.',
    imagen: 'galeria/mochila-escolar-escudo-institucional.jpg',
    esImagenReferencial: true,
  },
  {
    id: 'gorra-evento-carrera',
    titulo: 'Gorra dad hat para una carrera 5K',
    prenda: 'gorras',
    tecnica: 'aplique',
    sector: 'eventos',
    puntadasAprox: 3200,
    coloresHilo: 3,
    reto:
      'Pedido para el kit de corredores de una carrera 5K local. Plazo ajustado por la fecha fija del evento — se priorizó un diseño de aplique, más rápido de producir en volumen que un bordado plano detallado.',
    imagen: 'galeria/gorra-dad-hat-aplique-carrera-5k.jpg',
    esImagenReferencial: true,
  },
  {
    id: 'polo-constructora-corporativa',
    titulo: 'Polo corporativa con logo y nombre',
    prenda: 'polos',
    tecnica: 'plano',
    sector: 'construccion',
    puntadasAprox: 5400,
    coloresHilo: 2,
    reto:
      'Uniforme para personal administrativo de una constructora: logo en pecho izquierdo y nombre de la empresa en la espalda alta. Pedido recurrente — el archivo ya digitalizado se reutiliza cada vez que ingresa personal nuevo.',
    imagen: 'galeria/polo-corporativa-constructora.jpg',
    esImagenReferencial: true,
  },
  {
    id: 'camiseta-gimnasio-3d',
    titulo: 'Camiseta deportiva con logo en relieve',
    prenda: 'polos',
    tecnica: '3d',
    sector: 'gimnasios',
    puntadasAprox: 7200,
    coloresHilo: 2,
    reto:
      'Logo de un box de entrenamiento funcional, bordado en relieve sobre tela deportiva de secado rápido. El desafío fue la elasticidad de la tela: se usó entretela de respaldo para que el bordado no se ondulara con el movimiento.',
    imagen: 'galeria/camiseta-deportiva-relieve-gimnasio.jpg',
    esImagenReferencial: true,
  },
  {
    id: 'chaleco-reflectivo-seguridad',
    titulo: 'Chaleco reflectivo con parche de seguridad',
    prenda: 'chompas',
    tecnica: 'parche',
    sector: 'construccion',
    puntadasAprox: 4600,
    coloresHilo: 3,
    reto:
      'Chalecos reflectivos para un equipo de seguridad industrial. El bordado se hizo sobre parche para no debilitar las cintas reflectivas cosidas de fábrica, manteniendo la certificación de visibilidad de la prenda.',
    imagen: 'galeria/chaleco-reflectivo-parche-seguridad.jpg',
    esImagenReferencial: true,
  },
  {
    id: 'bata-doctor-nombre',
    titulo: 'Bata clínica con nombre del profesional',
    prenda: 'chompas',
    tecnica: 'monograma',
    sector: 'salud',
    puntadasAprox: 1100,
    coloresHilo: 1,
    reto:
      'Bata individual para un profesional de la salud, con su nombre y título bordado en el pecho. Pieza única, sin mínimo de cantidad — el mismo proceso de digitalización que un pedido institucional grande, a escala de una sola prenda.',
    imagen: 'galeria/bata-clinica-nombre-doctor.jpg',
    esImagenReferencial: true,
  },
];

export const MACRO_SHOT = {
  titulo: 'La puntada de cerca',
  descripcion:
    'Esto es lo que separa un bordado bien hecho de uno apurado: densidad pareja, sin huecos ni amontonamiento, remates limpios y el hilo bien tensado de principio a fin.',
  imagen: 'galeria/macro-puntada-detalle.jpg',
  esImagenReferencial: true,
};
