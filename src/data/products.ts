import poloBordado from '../assets/products/hero-v2/bordado.png';
import camisetaEstampada from '../assets/products/hero-v2/estampado-street.png';
import camisetaSublimada from '../assets/products/hero-v2/sublimado.png';

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
    name: 'Polo Piqué Bordado',
    category: 'Polos',
    material: 'Piqué 100% algodón',
    sizes: 'S — M — L — XL — XXL',
    price: 15,
    tagline: 'Clásico corporativo con acabado premium. Bordado de logo en pecho, ideal para uniformes de oficina.',
    ghostWord: 'BORDADO',
    src: poloBordado,
    bg: '#F4845F',
    panel: '#F79B7F',
    visualScale: 1.046,
  },
  {
    sku: 'EST-001',
    name: 'Camiseta Estampada Grande',
    category: 'Camisetas',
    material: '100% algodón peinado',
    sizes: 'S — M — L — XL — XXL',
    price: 12,
    tagline: 'Estampado grande de alto impacto en el pecho. Ideal para lanzamientos de marca y streetwear.',
    ghostWord: 'ESTAMPADO',
    src: camisetaEstampada,
    bg: '#6BBF7A',
    panel: '#85CC92',
    visualScale: 1,
  },
  {
    sku: 'SUB-001',
    name: 'Camiseta 100% Sublimada',
    category: 'Camisetas',
    material: 'Poliéster sublimable de secado rápido',
    sizes: 'S — M — L — XL — XXL',
    price: 14,
    tagline: 'Diseño integral de borde a borde, sin límite de colores. Ideal para equipos y marcas llamativas.',
    ghostWord: 'SUBLIMADO',
    src: camisetaSublimada,
    bg: '#6EB5FF',
    panel: '#8DC4FF',
    visualScale: 1,
  },
];
