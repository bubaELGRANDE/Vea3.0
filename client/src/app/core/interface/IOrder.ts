import { IBuyer } from './IBuyer';
import { IPublishingItem } from './IPublishingItem';
import { ISaleStatus } from './ISalesStatus';
import { ISaleDet } from './ISaleDet';

export interface IOrder {
  id: number;                             // "Nº Orden"
  createdAt: string | Date;             // "Fecha/Hora" (asumiendo que se añade a la entidad Sales)
  buyer: IBuyer;                        // Para "Cliente" y potencialmente "Dirección"
  publishing: IPublishingItem;          // Para "Monto" y detalles del vendedor
  status: ISaleStatus;                  // Para "Estado"
  saleDetails?: ISaleDet;             // Opcional: si una orden tiene múltiples líneas de detalle para calcular el monto total
  // totalAmount?: number;              // Opcional: si el backend ya calcula y envía el monto total
  // shippingAddress?: string;          // Opcional: si la dirección de envío se almacena directamente en la venta
}