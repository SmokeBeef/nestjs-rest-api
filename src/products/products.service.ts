import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { db } from 'src/app/db';

@Injectable()
export class ProductsService {
  async create(createProductDto: CreateProductDto) {
    const result = db.products.create({
      data: createProductDto,
      select: {
        id: false,
      },
    });
    return result;
  }

  async findAll(take?: number, skip?: number) {
    return await db.products.findMany({
      skip,
      take,
      orderBy: {
        name: 'asc',
      },
    });
  }

  async findOne(id: number) {
    return await db.products.findUnique({
      where: {
        id,
      },
    });
  }

  async count(condition?: object) {
    return db.products.count({
      where: condition,
    });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    return await db.products.update({
      data: updateProductDto,
      where: {
        id: id,
      },
      select: {
        id: false,
      },
    });
  }

  async remove(id: number) {
    return await db.products.delete({
      where: {
        id,
      },
    });
  }
}
