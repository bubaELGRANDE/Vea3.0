import { ISaleInfo } from './ISaleInfo';

export interface IPayment {
  id: number;                         // Para la columna "ID Pago"
  amount: number;                     // Para la columna "Monto"
  // Modificado para usar los mismos estados que un Pedido/Venta para consistencia.
  payment_status: 'Pendiente' | 'Confirmada' | 'Enviada' | 'Entregada' | 'Cancelada' | string; // Para "Estado"
  payment_date: Date | string;        // Para la columna "Fecha"
  transaction_id: string;             // ID de referencia de la pasarela de pago
  payment_method: string;             // ej. "credit_card", "paypal"
  sale: ISaleInfo;                    // Relación con la venta para obtener Cliente y Publicación
}