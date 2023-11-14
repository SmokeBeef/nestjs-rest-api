import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Res,
  Put,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { metaPagination, response } from 'src/other/utils/wrapper';
import { Response } from 'express';
import { DEFAULT } from 'src/other/constant';

@Controller('v1/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  async findAll(
    @Res() res: Response,
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    const take = +limit || DEFAULT.LIMIT;
    const skip = take * +page || DEFAULT.SKIP;
    const result = await this.productsService.findAll(take, skip);

    const totalProducts = await this.productsService.count();
    console.log(Math.floor(totalProducts / take));

    const meta = metaPagination(
      totalProducts,
      +page || 1,
      Math.floor(totalProducts / take),
    );

    return response(res, result, 'success', 200, meta);
  }

  @Get(':id')
  async findOne(@Res() res: Response, @Param('id') id: string) {
    return response(
      res,
      await this.productsService.findOne(+id),
      'success get one product',
      200,
    );
  }

  @Put(':id')
  async update(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return response(
      res,
      await this.productsService.update(+id, updateProductDto),
      'success update',
      201,
    );
  }

  @Delete(':id')
  async remove(@Res() res: Response, @Param('id') id: string) {
    return response(
      res,
      await this.productsService.remove(+id),
      'success delete',
      200,
    );
  }
}
