import { IUsers } from './IUsers';

export interface ISeller {
  id: number;
  direction: string; // Dirección del vendedor
  phone: string;
  score?: number;
  user: IUsers; // Información del usuario anidada
  userId?: number;
  municipalityId?: number;
}