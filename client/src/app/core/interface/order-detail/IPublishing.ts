export interface IPublishing {
  id: number;
  title: string;
  description: string;
  price: number;
  type: number;
  statusId: number | null;
  sellerId: number | null;
  created_at: string;
  updated_at: string;
}