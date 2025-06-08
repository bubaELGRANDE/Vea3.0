/**
 * Representa la descripción detallada de una publicación, incluyendo el SKU.
 * Corresponde a la tabla `publishing_desc`.
 */

import { IArticleStatus } from './IArticleStatus';
export interface IPublishingDescription {
  id: number;
  description: string;
  sku: string;
  articleStatus: IArticleStatus; // La condición del artículo (Nuevo, Usado, etc.)
}