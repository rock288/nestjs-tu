import { MinLength, IsNotEmpty, IsNumber } from 'class-validator';

export class ProductDto {
  @IsNotEmpty()
  categoryId?: number;

  @MinLength(5, { message: 'This field must be than 5 character' })
  productName?: string;

  @IsNumber()
  price?: number;
}
