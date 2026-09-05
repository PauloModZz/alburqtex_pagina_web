import poloBordado from '../assets/products/hero-v2/bordado-polo-alburqtex.png';
import camisetaEstampada from '../assets/products/hero-v2/estampado-oversize-alburqtex.png';
import camisetaSublimada from '../assets/products/hero-v2/sublimado-ecuador-alburqtex.png';

// Enlace de contacto tomado de la hoja CONFIG del inventario (INVENTARIO.xlsx).
export const WHATSAPP_LINK = 'https://wa.me/message/DKEOUHOXAO5QI1';

export interface ShowcaseProduct {
  sku: string;
  name: string;
  category: string;
  material: string;
  sizes: string;
  price: number;
  tagline: string;
  /** Palabra gigante "fantasma" de fondo que describe la técnica de este producto. */
  ghostWord: string;
  src: string;
  bg: string;
  panel: string;
  /** Ajuste mínimo para que el alto visible de todas las prendas coincida. */
  visualScale: number;
}

// Tres mockups con el mismo lienzo, encuadre y escala. El fondo fue retirado
// localmente para conservar bordes transparentes limpios en el carrusel.
export const PRODUCTS: ShowcaseProduct[] = [
  {
    sku: 'BRD-011',
    name: 'Polo Alburqtex Bordada',
    category: 'Polos',
    material: 'Piqué 100% algodón',
    sizes: 'S — M — L — XL — XXL',
    price: 15,
    tagline: 'Polo blanca premium con etiqueta Alburqtex, ribetes rojos y bordado pequeño en el pecho.',
    ghostWord: 'BORDADO',
    src: poloBordado,
    bg: '#F4845F',
    panel: '#F79B7F',
    visualScale: 1.046,
  },
  {
    sku: 'EST-001',
    name: 'Camiseta Oversize Estampada',
    category: 'Camisetas',
    material: 'Algodón pesado de alto gramaje',
    sizes: 'S — M — L — XL — XXL',
    price: 12,
    tagline: 'Corte oversize, mangas amplias y cuello grueso. Estampado urbano Alburqtex de gran formato en la espalda.',
    ghostWord: 'ESTAMPADO',
    src: camisetaEstampada,
    bg: '#6BBF7A',
    panel: '#85CC92',
    visualScale: 1,
  },
  {
    sku: 'SUB-001',
    name: 'Camiseta Ecuador Sublimada',
    category: 'Camisetas',
    material: 'Poliéster sublimable de secado rápido',
    sizes: 'S — M — L — XL — XXL',
    price: 14,
    tagline: 'Diseño deportivo negro inspirado en Ecuador, con detalles tricolor, patrón sublimado y marca Alburqtex.',
    ghostWord: 'SUBLIMADO',
    src: camisetaSublimada,
    bg: '#6EB5FF',
    panel: '#8DC4FF',
    visualScale: 1,
  },
];
