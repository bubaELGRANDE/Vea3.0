/**
 * Representa una fila de datos ya procesada y aplanada, lista para ser
 * mostrada directamente en la tabla del componente `post-list.component.html`.
 * Esto simplifica la lógica en la plantilla HTML.
 */
export interface IPostRowDisplay {
  publicationId: number;    // Para la columna "Nº Publicación"
  postName: string;         // Para "Nombre Post"
  tags: string;             // Para "Tags" (ej. "Electrónicos, Hogar")
  sku: string;              // Para "SKU"
  price: number;            // Para "Precio"
  statusText: string; 
  createdAt: string | Date      // Para "Estado" (ej. "Activo")
  // `saleId` no aplica aquí, pero podríamos añadir un `publicationId` si las acciones lo necesitan.
}