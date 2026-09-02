import raw from './catalog.json';

export interface CatalogProduct {
  sku: string;
  name: string;
  category: string;
  price: number;
  material: string;
  sizes: string;
  gender: string;
  ageGroup: string;
  image: string;
  tagline: string;
  stock: number;
  fotoReal: boolean;
}

export const CATALOG: CatalogProduct[] = raw as CatalogProduct[];

export const CATEGORIES: string[] = Array.from(
  new Set(CATALOG.map((p) => p.category)),
);
