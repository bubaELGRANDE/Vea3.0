import { IsNotEmpty, IsNumber, IsString, IsOptional, Min, Max, MaxLength } from 'class-validator';

export class CreateReviewDto {
    @IsNotEmpty({ message: 'El ID de la venta es obligatorio' })
    @IsNumber({}, { message: 'El ID de la venta debe ser un número' })
    saleId!: number;    @IsNotEmpty({ message: 'La reseña es obligatoria' })
    @IsString({ message: 'La reseña debe ser una cadena de texto' })
    @MaxLength(1000, { message: 'La reseña no puede exceder los 1000 caracteres' })
    review!: string;

    @IsNotEmpty({ message: 'La calificación es obligatoria' })
    @IsNumber({}, { message: 'La calificación debe ser un número' })
    @Min(1, { message: 'La calificación mínima es 1' })
    @Max(5, { message: 'La calificación máxima es 5' })
    rating!: number;
}

export class UpdateReviewDto {
    @IsOptional()
    @IsNumber({}, { message: 'El ID de la venta debe ser un número' })
    saleId?: number;

    @IsOptional()
    @IsString({ message: 'La reseña debe ser una cadena de texto' })
    review?: string;

    @IsOptional()
    @IsNumber({}, { message: 'La calificación debe ser un número' })
    @Min(1, { message: 'La calificación mínima es 1' })
    @Max(5, { message: 'La calificación máxima es 5' })
    rating?: number;
}
