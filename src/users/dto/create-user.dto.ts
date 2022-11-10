import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { User } from '../entities/user.entity';

export class CreateUserDto implements User {
  @IsNotEmpty()
  @Length(3, 50)
  firstName: string;

  @IsNotEmpty()
  @Length(3, 50)
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(8, 20)
  password: string;
}
