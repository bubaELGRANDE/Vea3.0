import { IsString, IsNumber, IsOptional, MinLength, MaxLength, IsNotEmpty } from 'class-validator';

export class CreateProductDto {
    @IsNotEmpty({ message: 'El ID del estado es obligatorio' })
    @IsNumber({}, { message: 'El ID del estado debe ser un número' })
    statusId!: number;

    @IsNotEmpty({ message: 'El ID del vendedor es obligatorio' })
    @IsNumber({}, { message: 'El ID del vendedor debe ser un número' })
    sellerId!: number;

    @IsString({ message: 'El título debe ser una cadena de texto' })
    @MinLength(3, { message: 'El título debe tener al menos 3 caracteres' })
    @MaxLength(25, { message: 'El título no puede tener más de 25 caracteres' })
    title!: string;

    @IsString({ message: 'El artículo debe ser una cadena de texto' })
    @MinLength(3, { message: 'El artículo debe tener al menos 3 caracteres' })
    @MaxLength(25, { message: 'El artículo no puede tener más de 25 caracteres' })
    article!: string;

    @IsString({ message: 'La descripción debe ser una cadena de texto' })
    @MinLength(10, { message: 'La descripción debe tener al menos 10 caracteres' })
    description!: string;

    @IsNotEmpty({ message: 'El precio es obligatorio' })
    @IsNumber({}, { message: 'El precio debe ser un número' })
    price!: number;

    @IsNotEmpty({ message: 'El tipo es obligatorio' })
    @IsNumber({}, { message: 'El tipo debe ser un número' })
    type!: number;
}

export class UpdateProductDto {
    @IsOptional()
    @IsNumber({}, { message: 'El ID del estado debe ser un número' })
    statusId?: number;

    @IsOptional()
    @IsNumber({}, { message: 'El ID del vendedor debe ser un número' })
    sellerId?: number;

    @IsOptional()
    @IsString({ message: 'El título debe ser una cadena de texto' })
    @MinLength(3, { message: 'El título debe tener al menos 3 caracteres' })
    @MaxLength(25, { message: 'El título no puede tener más de 25 caracteres' })
    title?: string;

    @IsOptional()
    @IsString({ message: 'El artículo debe ser una cadena de texto' })
    @MinLength(3, { message: 'El artículo debe tener al menos 3 caracteres' })
    @MaxLength(25, { message: 'El artículo no puede tener más de 25 caracteres' })
    article?: string;

    @IsOptional()
    @IsString({ message: 'La descripción debe ser una cadena de texto' })
    @MinLength(10, { message: 'La descripción debe tener al menos 10 caracteres' })
    description?: string;

    @IsOptional()
    @IsNumber({}, { message: 'El precio debe ser un número' })
    price?: number;

    @IsOptional()
    @IsNumber({}, { message: 'El tipo debe ser un número' })
    type?: number;
}
