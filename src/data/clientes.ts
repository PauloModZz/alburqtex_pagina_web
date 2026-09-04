export type SectorCliente =
  | 'Fuerzas Armadas'
  | 'Educación'
  | 'Deporte y calzado'
  | 'Hogar y decoración'
  | 'Empresas';

export interface Cliente {
  name: string;
  img: string;
  sector: SectorCliente;
}

/** Clientes reales — misma lista que ya mostraba ClientsSection, ahora compartida con /clientes. */
export const CLIENTS: Cliente[] = [
  { name: 'Armada del Ecuador', img: '/clients/armada-ecuador.png', sector: 'Fuerzas Armadas' },
  { name: 'Ejército Ecuatoriano', img: '/clients/ejercito-ecuador.jpg', sector: 'Fuerzas Armadas' },
  { name: 'Colegio Alemán Humboldt Samborondón', img: '/clients/cahs-samborondon.jpg', sector: 'Educación' },
  { name: 'Corporación Pisadas', img: '/clients/pisadas.jpg', sector: 'Deporte y calzado' },
  { name: "D'Casa", img: '/clients/dcasa.jpg', sector: 'Hogar y decoración' },
  { name: 'Unidad Educativa Javier', img: '/clients/colegio-javier.svg', sector: 'Educación' },
  { name: 'Unidad Educativa La Moderna', img: '/clients/la-moderna.png', sector: 'Educación' },
];
