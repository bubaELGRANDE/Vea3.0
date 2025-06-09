import { IUsers } from './IUsers';
export interface IBuyer {
  id: number;
  phone: string;
  user: IUsers; // Información del usuario anidada
  userId?: number;
  direction?: string;
}