import { ISeller } from './ISeller';
import { ICategory } from './ICategory';
import { IPublishingStatus } from './IPublishingStatus';
import { IPublishingDescription } from './IPublishingDescription';
import { IPublishingImage } from './IPublishingImage';
export interface IPublishing {
  id: number;
  title: string;
  description: string; // En backend es 'description', en cliente era 'article'
  price: number;
  type: number;
  status: IPublishingStatus;
  categories: ICategory[];
  descriptions: IPublishingDescription[];
  statusId?: number; // ID del estado de la publicación
  // status?: IPublishingStatus; // Si se carga el objeto PublishingStatus completo
  seller: ISeller; // Información del vendedor anidada
  images: IPublishingImage[];   // Para mostrar imágenes en vistas de detalle
  createdAt: Date | string;     // Fecha de creación
  updatedAt: Date | string;     // Fecha de última actualización
}