import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  IsArray,
  IsInt,
  Min,
  IsOptional,
  ValidateIf,
  registerDecorator,
  ValidationArguments,
  ValidationOptions
} from 'class-validator';



function IsArrayOfNumbers(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isArrayOfNumbers',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return (
            Array.isArray(value) &&
            value.every((val) => !isNaN(val) && Number.isInteger(Number(val)))
          );
        },
        defaultMessage(args: ValidationArguments) {
          return 'Cada ID de categoría debe ser un número entero.';
        }
      }
    });
  };
}

export class CreatePublishingDto {
  @IsNotEmpty({ message: 'El título no puede estar vacío.' })
  @IsString()
  @Length(5, 100, { message: 'El título debe tener entre 5 y 100 caracteres.' })
  title!: string;

  @IsNotEmpty({ message: 'La descripción no puede estar vacía.' })
  @IsString()
  description!: string;

  @IsNotEmpty({ message: 'El precio es requerido.' })
  @IsNumber({}, { message: 'El precio debe ser un número.' })
  @Min(0, { message: 'El precio no puede ser negativo.' })
  price!: number;

  @IsNotEmpty({ message: 'El estado del artículo es requerido.' })
  @IsInt({ message: 'El ID del estado del artículo debe ser un número entero.' })
  articleStatusId!: number; // Corresponde a "Nuevo", "Usado", etc.

 
  @IsNotEmpty({ message: 'Las categorías son requeridas.' })
  @IsArray({ message: 'Las categorías deben ser un array.' })
  @IsArrayOfNumbers({ message: 'Cada ID de categoría debe ser un número entero.' })
  categoryIds!: number[];

  @IsOptional()
  @IsString()
  @Length(3, 50, { message: 'El SKU debe tener entre 3 y 50 caracteres.' })
  sku?: string;

  sellerId!: number; 
  statusId!: number; 
}
