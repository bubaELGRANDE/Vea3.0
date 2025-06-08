/**
 * Representa una imagen asociada a una publicación.
 * Corresponde a la tabla `publishing_img`.
 */
export interface IPublishingImage {
  id: number;
  img: string; // Nombre del archivo de imagen
  url: string; // URL completa de la imagen
}