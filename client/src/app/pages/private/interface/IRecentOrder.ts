export interface IRecentOrder {
  saleId: number;
  clientName: string;         // Se obtendrá de sale.buyer.user.name
  publicationTitle: string;   // Se obtendrá de sale.publishing.title
  amount: number;             // Se obtendrá de sale.publishing.price o de payload.amount
  date: Date | string;        // Se obtendrá de sale.created_at
}