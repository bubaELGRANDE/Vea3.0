/**
 * Representa un estado de publicación (ej. "Activo", "Inactivo").
 * Corresponde a la tabla `publishing_status`.
 */
export interface IPublishingStatus {
  id: number;
  status: string;
}