import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
  UseInterceptors,
  UploadedFile,
  Query,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { upload } from './utils/upload.user';
import { DEFAULT } from 'src/other/constant';
import { response } from '../other/utils/wrapper';

@Controller('v1/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseInterceptors(upload)
  async create(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() file,
    @Res() res: Response,
  ) {
    console.log(file);
    createUserDto.photo = file.filename;

    console.log(file);

    const result = await this.userService.create(createUserDto);

    return res.status(201).json({
      data: result,
      err: null,
      msg: 'success add user',
    });
  }

  @Get()
  async findAll(
    @Res() res: Response,
    @Query('limit') limit: string,
    @Query('page') page: string,
  ) {
    const take = +limit || DEFAULT.LIMIT;
    const skip = take * +page || DEFAULT.SKIP;
    const result = await this.userService.findAll(take, skip);
    const totalUsers = await this.userService.totalData();
    return res.status(200).json({
      msg: 'success get user',
      data: result,
      meta: {
        totalData: totalUsers,
        totalPage: totalUsers / take,
        currentPage: page || 1,
      },
    });
  }

  @Get(':id')
  async findOne(@Res() res: Response, @Param('id') id: string) {
    return response(res, await this.userService.findOne(+id), 'success', 200);
  }

  @Put(':id')
  async update(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return response(
      res,
      await this.userService.update(+id, updateUserDto),
      'success',
      200,
    );
  }

  @Delete(':id')
  async remove(@Res() res: Response, @Param('id') id: string) {
    return response(res, await this.userService.remove(+id), 'success', 200);
  }
}
