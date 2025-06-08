export class CreatePublishingDto {
  title!: string;
  description!: string;
  price!: number;
  articleStatusId!: number;
  categoryIds!: number[];
  sku?: string;

  // Nota: sellerId y statusId no se incluyen aquí porque
  // son responsabilidad del backend (se obtienen del token de auth y
  // se asignan por defecto, respectivamente).
}
