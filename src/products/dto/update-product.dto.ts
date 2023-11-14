import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  img_product?: string;
  name?: string;
  price?: number;
  stock?: number;
}
