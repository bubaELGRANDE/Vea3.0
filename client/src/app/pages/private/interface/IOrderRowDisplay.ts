export interface IOrderRowDisplay {
  orderNumber: number;      // Para "Nº Orden"
  dateTime: string;         // Para "Fecha/Hora" (formateada)
  clientName: string;       // Para "Cliente"
  shippingAddress: string;  // Para "Dirección" (derivada)
  amount: number;           // Para "Monto" (derivado o formateado)
  statusText: string;       // Para "Estado" (texto descriptivo)
  saleId: number;           // ID de la venta para acciones
}