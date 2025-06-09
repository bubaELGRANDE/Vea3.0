export interface IUsers {
  id: number;
  name: string;
  username: string;
  img?: string;
  email: string;
  address?: string; // Considerar para la dirección de envío del comprador
  createdAt?: string | Date;
  updatedAt?: string | Date;
}