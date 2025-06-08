import { IOrderDetailPublishing } from './IOrderDetailPublishing';
import { IOrderDetailCustomer } from './IOrderDetailCustomer';
import { IOrderDetailPayment } from './IOrderDetailPayment';

export interface IOrderDetail {
  orderId: number;                  // ID del pedido/venta
  orderDate: Date | string;         // Fecha de creación del pedido
  orderStatus: string;              // Estado del pedido (Pendiente, Confirmada, etc.)
  
  // La dirección de entrega completa, formateada por el backend.
  shippingAddress: {
    name: string; // Nombre del destinatario (puede ser diferente al del comprador)
    phone: string;
    fullAddress: string; // ej. "Calle Villa Real, Nro. 2, Mejicanos, San Salvador"
  };
  
  product: IOrderDetailPublishing;  // Objeto con los detalles del producto
  customer: IOrderDetailCustomer;   // Objeto con los detalles del cliente
  payment: IOrderDetailPayment;     // Objeto con los detalles del pago
}