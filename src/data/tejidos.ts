export type Receptividad = 'excelente' | 'buena' | 'requiere-refuerzo' | 'no-recomendado';

export interface Tejido {
  id: string;
  nombre: string;
  receptividad: Receptividad;
  gramajeRecomendado: string;
  necesitaEntretela: boolean;
  advertencia?: string;
}

export const RECEPTIVIDAD_LABEL: Record<Receptividad, string> = {
  excelente: 'Excelente para bordar',
  buena: 'Buena, con cuidado',
  'requiere-refuerzo': 'Necesita refuerzo',
  'no-recomendado': 'No recomendado',
};

export const TEJIDOS: Tejido[] = [
  {
    id: 'pique',
    nombre: 'Piqué (polos)',
    receptividad: 'excelente',
    gramajeRecomendado: '180–220 g/m²',
    necesitaEntretela: false,
    advertencia: undefined,
  },
  {
    id: 'jersey',
    nombre: 'Jersey / algodón peinado (camisetas)',
    receptividad: 'excelente',
    gramajeRecomendado: '160–200 g/m²',
    necesitaEntretela: false,
  },
  {
    id: 'gabardina',
    nombre: 'Gabardina',
    receptividad: 'excelente',
    gramajeRecomendado: '220–280 g/m²',
    necesitaEntretela: false,
  },
  {
    id: 'poliester-deportivo',
    nombre: 'Poliéster deportivo (secado rápido)',
    receptividad: 'requiere-refuerzo',
    gramajeRecomendado: '140–180 g/m²',
    necesitaEntretela: true,
    advertencia: 'Es una tela liviana y con algo de elasticidad — sin entretela de respaldo, el bordado puede ondular la tela alrededor del diseño.',
  },
  {
    id: 'softshell',
    nombre: 'Softshell',
    receptividad: 'requiere-refuerzo',
    gramajeRecomendado: '280–340 g/m²',
    necesitaEntretela: true,
    advertencia: 'Suele llevar membrana impermeable — bordar directo la perfora. Se recomienda aplicar el bordado sobre un parche en vez de bordar la prenda directamente.',
  },
  {
    id: 'polar',
    nombre: 'Polar / fleece',
    receptividad: 'requiere-refuerzo',
    gramajeRecomendado: '260–320 g/m²',
    necesitaEntretela: true,
    advertencia: 'El pelo de la tela se cuela entre las puntadas si no se pone un soluble encima antes de bordar, dejando el diseño con aspecto "peludo" y menos nítido.',
  },
  {
    id: 'denim',
    nombre: 'Denim / mezclilla',
    receptividad: 'buena',
    gramajeRecomendado: '300–400 g/m²',
    necesitaEntretela: false,
    advertencia: 'Tela gruesa: puede requerir aguja e hilo más resistentes, y el bordado tarda algo más que en telas livianas.',
  },
  {
    id: 'toalla',
    nombre: 'Toalla / rizo',
    receptividad: 'requiere-refuerzo',
    gramajeRecomendado: '400–500 g/m²',
    necesitaEntretela: true,
    advertencia: 'El rizo absorbe el hilo y puede hundir el bordado si no se usa un soluble de respaldo — sin eso, el diseño queda flojo e irregular.',
  },
];

export interface UbicacionBordado {
  id: string;
  nombre: string;
  medidaMaxima: string;
  anchor: { x: number; y: number };
}

export const UBICACIONES_BORDADO: UbicacionBordado[] = [
  { id: 'pecho-izquierdo', nombre: 'Pecho izquierdo', medidaMaxima: '10 × 10 cm', anchor: { x: 38, y: 30 } },
  { id: 'pecho-centrado', nombre: 'Pecho centrado', medidaMaxima: '20 × 20 cm', anchor: { x: 50, y: 32 } },
  { id: 'espalda-completa', nombre: 'Espalda completa', medidaMaxima: '30 × 35 cm', anchor: { x: 50, y: 28 } },
  { id: 'manga', nombre: 'Manga', medidaMaxima: '8 × 8 cm', anchor: { x: 80, y: 40 } },
  { id: 'cuello-posterior', nombre: 'Cuello posterior', medidaMaxima: '12 × 4 cm', anchor: { x: 50, y: 10 } },
  { id: 'frontal-gorra', nombre: 'Frontal de gorra', medidaMaxima: '11 × 6 cm', anchor: { x: 50, y: 45 } },
  { id: 'lateral-gorra', nombre: 'Lateral de gorra', medidaMaxima: '6 × 4 cm', anchor: { x: 80, y: 50 } },
  { id: 'cierre-gorra', nombre: 'Cierre de gorra (parte trasera)', medidaMaxima: '10 × 3 cm', anchor: { x: 50, y: 85 } },
];
