import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserDocument } from './schemas/user.schema';
import { compare } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto) {
    return await this.userModel.create(createUserDto);
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(userId: string) {
    return await this.userModel.findOne({ _id: userId });
  }

  update(userId: string, updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);
    return `This action updates a #${userId} user`;
  }

  remove(userId: string) {
    return `This action removes a #${userId} user`;
  }

  async validateUserPassword(user: User, password: string): Promise<boolean> {
    return await compare(password, user.password);
  }

  async findByCredentials(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const isPasswordValid = await this.validateUserPassword(user, password);

    if (!isPasswordValid) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }
}
