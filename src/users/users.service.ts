import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserDocument } from './schemas/user.schema';
import { compare } from 'bcrypt';
import { Presense } from 'src/assists/entities/assist.entity';

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

  async validateUserPassword(hash: string, password: string): Promise<boolean> {
    return await compare(password, hash);
  }

  async findByCredentials(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const isPasswordValid = await this.validateUserPassword(
      user.password,
      password,
    );

    if (!isPasswordValid) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }

  async addStudyingCareer(userId: string, careerId: string) {
    const user = await this.userModel.findOne({ _id: userId });
    user.studying_careers.push({ career: careerId, inassistences: 0 });
    return await user.save();
  }

  async isAdmin(userId: string) {
    const user = await this.userModel.findOne({ _id: userId });
    return user.isAdmin;
  }

  async addInassitence(userId: string, careerId: string) {
    const user = await this.userModel.findOne({ _id: userId });
    const career = user.studying_careers.find(
      (career) => career.career.toString() === careerId,
    );
    career.inassistences += 1;
    return await user.save();
  }

  async addInsistences(presenses: Presense[], careerId: string) {
    for (const presence of presenses) {
      const { user, is_present } = presence;

      if (is_present) {
        continue;
      }

      await this.addInassitence(user, careerId);
    }
  }

  async existUser(userId: string) {
    try {
      const user = await this.userModel.findOne({ _id: userId });
      return !!user;
    } catch (error) {
      return false;
    }
  }

  async addTeacherToUser(userId: string, subjectId: string) {
    return await this.userModel.findOneAndUpdate(
      { _id: userId },
      { $push: { teachers: subjectId } },
      { new: true },
    );
  }
}
