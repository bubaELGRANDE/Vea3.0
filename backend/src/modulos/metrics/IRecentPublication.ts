export interface IRecentPublication {
  publicationId: number;
  title: string;
  date: Date | string;        // Se obtendrá de publishing.created_at
}