import { IsNotEmpty, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class CreateChatDto {
    @IsNotEmpty({ message: 'El ID de la publicación es obligatorio' })
    @IsNumber({}, { message: 'El ID de la publicación debe ser un número' })
    publishingId!: number;

    @IsNotEmpty({ message: 'El ID del comprador es obligatorio' })
    @IsNumber({}, { message: 'El ID del comprador debe ser un número' })
    buyerId!: number;

    @IsNotEmpty({ message: 'El ID del vendedor es obligatorio' })
    @IsNumber({}, { message: 'El ID del vendedor debe ser un número' })
    sellerId!: number;

    @IsNotEmpty({ message: 'El estado del chat es obligatorio' })
    @IsBoolean({ message: 'El estado del chat debe ser un booleano' })
    isEnable!: boolean;
}

export class UpdateChatDto {
    @IsOptional()
    @IsNumber({}, { message: 'El ID de la publicación debe ser un número' })
    publishingId?: number;

    @IsOptional()
    @IsNumber({}, { message: 'El ID del comprador debe ser un número' })
    buyerId?: number;

    @IsOptional()
    @IsNumber({}, { message: 'El ID del vendedor debe ser un número' })
    sellerId?: number;

    @IsOptional()
    @IsBoolean({ message: 'El estado del chat debe ser un booleano' })
    isEnable?: boolean;
}
