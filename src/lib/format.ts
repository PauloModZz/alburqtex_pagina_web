// Algunas tallas del catálogo ya son frases completas (ej. "Talla única
// ajustable"), así que solo anteponemos la palabra "Talla" cuando el valor
// es un código corto (S, M, L, XL...) y no la incluye ya.
export function sizeLabel(size: string): string {
  return /talla/i.test(size) ? size : `Talla ${size}`;
}
