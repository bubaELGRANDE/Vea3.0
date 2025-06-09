export interface ISaleDet {
  id: number;
  price: number; // Precio para este detalle específico de la venta
  saleId?: number;
  payloadId?: number;
  // Considerar añadir una referencia parcial al producto si es necesario:
  // publishingItem?: Partial<IPublishingItem>;
}