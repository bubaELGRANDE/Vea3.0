/**
 * Representa el estado o condición de un artículo (ej. "Nuevo", "Usado").
 * Corresponde a la tabla `article_status`.
 */
export interface IArticleStatus {
  id: number;
  status: string;
}