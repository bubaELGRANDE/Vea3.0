import { IsNotEmpty, IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class CreateBuyerDto {
    @IsNotEmpty({ message: 'El ID de usuario no puede estar vacío' })
    @IsNumber({}, { message: 'El ID de usuario debe ser un número' })
    userId!: number;

    @IsString({ message: 'El teléfono debe ser una cadena de texto' })
    @Length(7, 10, { message: 'El teléfono debe tener entre 7 y 10 dígitos' })
    phone!: string;
}

export class UpdateBuyerDto {
    @IsOptional()
    @IsNumber({}, { message: 'El ID de usuario debe ser un número' })
    userId?: number;

    @IsOptional()
    @IsString({ message: 'El teléfono debe ser una cadena de texto' })
    @Length(7, 10, { message: 'El teléfono debe tener entre 7 y 10 dígitos' })
    phone?: string;
}

