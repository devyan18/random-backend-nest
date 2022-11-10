import { IsEmail, IsNotEmpty } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

export class LoginUserDto implements Partial<User> {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
