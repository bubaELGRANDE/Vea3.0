export interface IPaymentRowDisplay {
  paymentId: number;          // "ID Pago"
  clientName: string;         // "Cliente"
  publicationName: string;    // "Publicación"
  amount: number;             // "Monto"
  status: string;             // "Estado"
  date: string;               // "Fecha" (formateada)
  rawDate: Date | string;
}