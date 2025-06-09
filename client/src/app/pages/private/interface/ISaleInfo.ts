import { IBuyer } from './IBuyer';
import { IPublicationInfo } from './IPublicationInfo';

/**
 * Representa la información de una venta (sale) necesaria para un pago.
 * Contiene las relaciones anidadas con la publicación y el comprador.
 */
export interface ISaleInfo {
  id: number;
  publishing: IPublicationInfo;
  buyer: IBuyer;
}
