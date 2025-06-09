import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateSaleDto {
    @IsNotEmpty({ message: 'El ID de la publicación es obligatorio' })
    @IsNumber({}, { message: 'El ID de la publicación debe ser un número' })
    publishingId!: number;

    @IsNotEmpty({ message: 'El ID del comprador es obligatorio' })
    @IsNumber({}, { message: 'El ID del comprador debe ser un número' })
    buyerId!: number;

    @IsNotEmpty({ message: 'El ID del estado es obligatorio' })
    @IsNumber({}, { message: 'El ID del estado debe ser un número' })
    statusId!: number;
}

export class UpdateSaleDto {
    @IsOptional()
    @IsNumber({}, { message: 'El ID de la publicación debe ser un número' })
    publishingId?: number;

    @IsOptional()
    @IsNumber({}, { message: 'El ID del comprador debe ser un número' })
    buyerId?: number;

    @IsOptional()
    @IsNumber({}, { message: 'El ID del estado debe ser un número' })
    statusId?: number;
}
