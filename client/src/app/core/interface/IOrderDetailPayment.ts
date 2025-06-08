export interface IOrderDetailPayment {
  totalAmount: number;    // ej. 400.20
  paymentMethod: string;
  transactionId: string;
  status: string;
}