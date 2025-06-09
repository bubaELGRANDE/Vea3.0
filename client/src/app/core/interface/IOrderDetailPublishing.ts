import { IPublishingImage } from './IPublishingImage';

export interface IOrderDetailPublishing {
  id: number;
  title: string;      // ej. "Servicio de mantenimiento"
  price: number;      // ej. 0.20
  // Asumimos que la publicación tiene al menos una imagen.
  mainImage?: IPublishingImage;
}
