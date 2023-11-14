import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { db } from 'src/app/db';

@Injectable()
export class UserService {
  async create(createUserDto: CreateUserDto) {
    const result = await db.user.create({ data: createUserDto });
    return result;
  }

  async findAll(take: number, skip: number) {
    const result = await db.user.findMany({
      take,
      skip,
    });
    return result;
  }
  async totalData() {
    return db.user.count();
  }

  async findOne(id: number) {
    const result = await db.user.findUnique({ where: { id: id } });
    return result;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const payload = updateUserDto;
    console.log(payload);

    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
