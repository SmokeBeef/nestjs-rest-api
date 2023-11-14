import { user_role } from '@prisma/client';
import { IsEmpty, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  @IsString({ groups: ['admin', 'manager', 'kasir'] })
  role: user_role;
  @IsEmpty()
  photo: string;
}
