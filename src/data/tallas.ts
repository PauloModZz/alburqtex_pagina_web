/**
 * Guías de referencia para prendas terminadas de corte estadounidense.
 * Todas las medidas están en centímetros y corresponden a la prenda extendida
 * sobre una superficie plana. No son medidas corporales ni una norma universal:
 * cada fabricante puede variar por modelo, tela y tolerancia de confección.
 */

export interface MedidaCampo {
  key: string;
  label: string;
  anchor: { x: number; y: number };
}

export interface SizeRow {
  talla: string;
  medidasCm: Record<string, number>;
}

export type Calce = 'entallado' | 'regular' | 'holgado';

export interface GarmentSizeGuide {
  id: string;
  nombre: string;
  imagen: string;
  calce: Calce;
  calceNota: string;
  campos: MedidaCampo[];
  filas: SizeRow[];
  tallasNino?: SizeRow[];
  notas?: string;
}

const PECHO: MedidaCampo = { key: 'pecho', label: 'Ancho de pecho', anchor: { x: 50, y: 45 } };
const LARGO: MedidaCampo = { key: 'largo', label: 'Largo total', anchor: { x: 36, y: 78 } };
const MANGA: MedidaCampo = { key: 'manga', label: 'Largo de manga', anchor: { x: 84, y: 34 } };
const HOMBRO: MedidaCampo = { key: 'hombro', label: 'Hombro a hombro', anchor: { x: 50, y: 19 } };

export const SIZE_GUIDES: GarmentSizeGuide[] = [
  {
    id: 'polo',
    nombre: 'Polo piqué',
    imagen: '/size-guides/polo.jpg',
    calce: 'regular',
    calceNota: 'Corte unisex estadounidense regular, pensado para uniformes corporativos.',
    campos: [PECHO, LARGO, MANGA, HOMBRO],
    filas: [
      { talla: 'S', medidasCm: { pecho: 48, largo: 71, manga: 22, hombro: 43 } },
      { talla: 'M', medidasCm: { pecho: 53, largo: 74, manga: 23, hombro: 46 } },
      { talla: 'L', medidasCm: { pecho: 58, largo: 76, manga: 24, hombro: 49 } },
      { talla: 'XL', medidasCm: { pecho: 64, largo: 79, manga: 25, hombro: 52 } },
      { talla: '2XL', medidasCm: { pecho: 69, largo: 81, manga: 26, hombro: 55 } },
      { talla: '3XL', medidasCm: { pecho: 74, largo: 84, manga: 27, hombro: 58 } },
    ],
    notas: 'Ancho de pecho: de axila a axila. Para obtener el contorno aproximado de la prenda, multiplica este valor por dos.',
  },
  {
    id: 'camiseta',
    nombre: 'Camiseta',
    imagen: '/size-guides/camiseta.jpg',
    calce: 'regular',
    calceNota: 'Corte clásico unisex estadounidense. Una camiseta oversize necesita una tabla distinta.',
    campos: [PECHO, LARGO, MANGA, HOMBRO],
    filas: [
      { talla: 'S', medidasCm: { pecho: 46, largo: 71, manga: 20, hombro: 43 } },
      { talla: 'M', medidasCm: { pecho: 51, largo: 74, manga: 21, hombro: 48 } },
      { talla: 'L', medidasCm: { pecho: 56, largo: 76, manga: 22, hombro: 53 } },
      { talla: 'XL', medidasCm: { pecho: 61, largo: 79, manga: 23, hombro: 58 } },
      { talla: '2XL', medidasCm: { pecho: 66, largo: 81, manga: 24, hombro: 63 } },
      { talla: '3XL', medidasCm: { pecho: 71, largo: 84, manga: 25, hombro: 68 } },
    ],
    notas: 'Perfil de medidas habitual en camisetas blank estadounidenses de corte clásico. La tolerancia normal de confección puede ser de ±2,5 cm.',
  },
  {
    id: 'camisa',
    nombre: 'Camisa corporativa',
    imagen: '/size-guides/camisa.jpg',
    calce: 'regular',
    calceNota: 'Corte estadounidense regular para camisa de botones y manga larga.',
    campos: [PECHO, LARGO, MANGA, HOMBRO],
    filas: [
      { talla: 'S', medidasCm: { pecho: 53, largo: 76, manga: 64, hombro: 46 } },
      { talla: 'M', medidasCm: { pecho: 58, largo: 78, manga: 65, hombro: 48 } },
      { talla: 'L', medidasCm: { pecho: 63, largo: 80, manga: 66, hombro: 50 } },
      { talla: 'XL', medidasCm: { pecho: 68, largo: 82, manga: 67, hombro: 52 } },
      { talla: '2XL', medidasCm: { pecho: 73, largo: 84, manga: 68, hombro: 54 } },
      { talla: '3XL', medidasCm: { pecho: 78, largo: 86, manga: 69, hombro: 56 } },
    ],
    notas: 'La manga se mide desde la costura del hombro hasta el final del puño. Las camisas slim fit requieren una tabla propia.',
  },
  {
    id: 'chompa',
    nombre: 'Chompa / casaca',
    imagen: '/size-guides/chompa.jpg',
    calce: 'holgado',
    calceNota: 'Corte estadounidense para capa exterior, con holgura para llevar otra prenda debajo.',
    campos: [PECHO, LARGO, MANGA, HOMBRO],
    filas: [
      { talla: 'S', medidasCm: { pecho: 56, largo: 70, manga: 65, hombro: 47 } },
      { talla: 'M', medidasCm: { pecho: 59, largo: 72, manga: 66, hombro: 49 } },
      { talla: 'L', medidasCm: { pecho: 62, largo: 74, manga: 67, hombro: 51 } },
      { talla: 'XL', medidasCm: { pecho: 66, largo: 76, manga: 68, hombro: 53 } },
      { talla: '2XL', medidasCm: { pecho: 70, largo: 78, manga: 69, hombro: 55 } },
      { talla: '3XL', medidasCm: { pecho: 74, largo: 80, manga: 70, hombro: 57 } },
    ],
    notas: 'Referencia para casaca softshell unisex. Una rompevientos o una casaca acolchada pueden tener medidas diferentes.',
  },
  {
    id: 'buzo-capucha',
    nombre: 'Buzo con capucha',
    imagen: '/size-guides/buzo-capucha.jpg',
    calce: 'holgado',
    calceNota: 'Corte clásico unisex estadounidense con espacio adicional en torso y mangas.',
    campos: [PECHO, LARGO, MANGA, HOMBRO],
    filas: [
      { talla: 'S', medidasCm: { pecho: 51, largo: 69, manga: 61, hombro: 51 } },
      { talla: 'M', medidasCm: { pecho: 56, largo: 71, manga: 62, hombro: 56 } },
      { talla: 'L', medidasCm: { pecho: 61, largo: 74, manga: 63, hombro: 61 } },
      { talla: 'XL', medidasCm: { pecho: 66, largo: 76, manga: 64, hombro: 66 } },
      { talla: '2XL', medidasCm: { pecho: 71, largo: 79, manga: 65, hombro: 71 } },
      { talla: '3XL', medidasCm: { pecho: 76, largo: 81, manga: 66, hombro: 76 } },
    ],
    notas: 'Referencia para hoodie pulóver de corte clásico. El hombro puede ser caído; por eso conviene comparar también pecho y largo.',
  },
  {
    id: 'gorra',
    nombre: 'Gorra ajustada',
    imagen: '/size-guides/gorra.jpg',
    calce: 'regular',
    calceNota: 'Equivalencias estadounidenses para gorras fitted, medidas por contorno de cabeza.',
    campos: [{ key: 'contorno', label: 'Contorno de cabeza', anchor: { x: 50, y: 70 } }],
    filas: [
      { talla: 'US 6 7/8', medidasCm: { contorno: 55 } },
      { talla: 'US 7', medidasCm: { contorno: 56 } },
      { talla: 'US 7 1/8', medidasCm: { contorno: 57 } },
      { talla: 'US 7 1/4', medidasCm: { contorno: 58 } },
      { talla: 'US 7 3/8', medidasCm: { contorno: 59 } },
      { talla: 'US 7 1/2', medidasCm: { contorno: 60 } },
      { talla: 'US 7 5/8', medidasCm: { contorno: 61 } },
      { talla: 'US 7 3/4', medidasCm: { contorno: 62 } },
    ],
    notas: 'Mide alrededor de la cabeza, aproximadamente 1 cm sobre las cejas. En gorras snapback ajustables, el rango habitual es 55–61 cm.',
  },
  {
    id: 'mandil',
    nombre: 'Mandil / delantal',
    imagen: '/size-guides/mandil.jpg',
    calce: 'regular',
    calceNota: 'Formato estadounidense de peto con tiras regulables al cuello y a la cintura.',
    campos: [
      { key: 'ancho', label: 'Ancho máximo', anchor: { x: 50, y: 50 } },
      { key: 'largo', label: 'Largo total', anchor: { x: 50, y: 78 } },
    ],
    filas: [
      { talla: 'One Size', medidasCm: { ancho: 71, largo: 86 } },
      { talla: 'XL', medidasCm: { ancho: 76, largo: 91 } },
    ],
    notas: 'El largo se mide desde la parte superior del peto, sin incluir la tira del cuello.',
  },
  {
    id: 'chaleco',
    nombre: 'Chaleco',
    imagen: '/size-guides/chaleco.jpg',
    calce: 'regular',
    calceNota: 'Corte unisex estadounidense pensado para usar sobre camisa, polo o camiseta.',
    campos: [PECHO, LARGO, HOMBRO],
    filas: [
      { talla: 'XS', medidasCm: { pecho: 51, largo: 66, hombro: 41 } },
      { talla: 'S', medidasCm: { pecho: 54, largo: 68, hombro: 43 } },
      { talla: 'M', medidasCm: { pecho: 58, largo: 70, hombro: 45 } },
      { talla: 'L', medidasCm: { pecho: 62, largo: 72, hombro: 47 } },
      { talla: 'XL', medidasCm: { pecho: 66, largo: 74, hombro: 49 } },
      { talla: '2XL', medidasCm: { pecho: 70, largo: 76, hombro: 51 } },
      { talla: '3XL', medidasCm: { pecho: 74, largo: 78, hombro: 53 } },
    ],
    notas: 'Referencia para chaleco softshell. Elige la talla considerando la prenda que se usará debajo.',
  },
  {
    id: 'uniforme-escolar',
    nombre: 'Polo escolar',
    imagen: '/size-guides/uniforme-escolar.jpg',
    calce: 'regular',
    calceNota: 'Tallas juveniles estadounidenses por letra; no equivalen directamente a la edad del estudiante.',
    campos: [PECHO, LARGO, MANGA, HOMBRO],
    filas: [
      { talla: 'Youth XS', medidasCm: { pecho: 36, largo: 51, manga: 16, hombro: 34 } },
      { talla: 'Youth S', medidasCm: { pecho: 41, largo: 56, manga: 18, hombro: 38 } },
      { talla: 'Youth M', medidasCm: { pecho: 46, largo: 61, manga: 19, hombro: 42 } },
      { talla: 'Youth L', medidasCm: { pecho: 48, largo: 64, manga: 20, hombro: 44 } },
      { talla: 'Youth XL', medidasCm: { pecho: 51, largo: 67, manga: 21, hombro: 46 } },
    ],
    notas: 'Para niños y adolescentes, mide una prenda que ya les quede bien; no selecciones la talla únicamente por la edad.',
  },
];

export function cmToInches(cm: number): number {
  return Math.round(cm * 0.3937 * 10) / 10;
}
