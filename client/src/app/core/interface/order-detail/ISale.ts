export interface ISale {
  id: number;
  publishingId: number | null;
  buyerId: number | null;
  statusId: number | null;
  created_at: string;
  updated_at: string;
}