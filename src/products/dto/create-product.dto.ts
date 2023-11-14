import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsNumber()
  @IsNotEmpty()
  price: number;
  @IsNumber()
  stock: number;

  img_product: string = 'http://dummyimage.com/226x219.png/cc0000/ffffff';
}
