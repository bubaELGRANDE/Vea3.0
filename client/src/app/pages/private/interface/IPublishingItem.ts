import { ISeller } from './ISeller';
export interface IPublishingItem {
  id: number;
  title: string;
  price: number; // Precio listado de la publicación
  seller: ISeller; // Para acceder a la dirección del vendedor si es necesario
}