import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { User } from '../entities/user.entity';

export class CreateUserDto implements User {
  @IsNotEmpty()
  @Length(3, 50)
  first_name: string;

  @IsNotEmpty()
  @Length(3, 50)
  last_name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(8, 20)
  password: string;
}
