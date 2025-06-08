export interface ISeller {
  id: number;
  direction: string;
  phone: string;
  score: number;
  userId: number | null;
  municipalityId: number | null;
}