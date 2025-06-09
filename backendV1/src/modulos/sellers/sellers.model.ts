export { Sellers } from '../../core/entity/Sellers';
import { IsString, IsNotEmpty, Length, IsEmail, IsOptional, IsBoolean, IsNumber, MinLength, MaxLength, IsDefined } from 'class-validator';

export class CreateSellerDto {
    @IsNotEmpty({ message: 'El ID del vendedor es obligatorio' })
    @IsNumber({}, { message: 'El ID del vendedor debe ser un número' })
    userId!: number;

    @IsString({ message: 'La dirección debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'La dirección del vendedor no puede estar vacío' })
    direction!: string;

    @IsNotEmpty({ message: 'El ID del municipio es obligatorio' })
    @IsNumber({}, { message: 'El ID del municipio debe ser un número' })
    municipalityId!: number;

    @IsNotEmpty({message: "El número de telefono del vendedor es obligatorio"})
    @IsString({ message: 'El teléfono debe ser una cadena de texto' })
    @Length(8, 10, { message: 'El teléfono debe tener entre 7 y 10 dígitos' })
    phone!: string;

    @IsNumber({}, { message: 'El ID del municipio debe ser un número' })
    score!: number;
}

export class UpdateSellerDto {
    @IsOptional()
    @IsNumber({}, { message: 'El ID del municipio debe ser un número' })
    userId?: number;

    @IsOptional()
    @IsString({ message: 'La dirección debe ser una cadena de texto' })
    direction?: string;

    @IsOptional()
    @IsNumber({}, { message: 'El ID del municipio debe ser un número' })
    municipalityId?: number;

    @IsOptional()
    @Length(8, 10, { message: 'El teléfono debe tener entre 8 y 10 dígitos' })
    phone?: string;

    @IsOptional()
    @IsNumber({}, { message: 'El ID del municipio debe ser un número' })
    score?: number;
}
