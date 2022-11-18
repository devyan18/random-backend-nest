import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { CreateCareerDto } from './dto/create-career.dto';
import { UpdateCareerDto } from './dto/update-career.dto';
import { Career, CareerDocument } from './schemas/career.schema';

@Injectable()
export class CareersService {
  constructor(
    @InjectModel(Career.name) private careerModel: Model<CareerDocument>,
    private readonly userService: UsersService,
  ) {}

  async create(createCareerDto: CreateCareerDto) {
    const { current_study_cycle } = createCareerDto;

    return await this.careerModel.create({
      ...createCareerDto,
      study_cycles: [current_study_cycle],
    });
  }

  async findAll() {
    return await this.careerModel.find();
  }

  async findOne(careerId: string) {
    return await this.careerModel.findOne({ _id: careerId });
  }

  async update(careerId: string, updateCareerDto: UpdateCareerDto) {
    return await this.careerModel.findOneAndUpdate(
      { _id: careerId },
      updateCareerDto,
      { new: true },
    );
  }

  async remove(careerId: string) {
    return await this.careerModel.findOneAndDelete({ _id: careerId });
  }

  async addStudent(careerId: string, studentId: string) {
    const userFound = await this.userService.existUser(studentId);

    if (!userFound) {
      throw new HttpException('Student not found', 404);
    }

    await this.userService.addStudyingCareer(studentId, careerId);

    return await this.careerModel.findOneAndUpdate(
      { _id: careerId },
      {
        $push: { students: studentId },
      },
      { new: true },
    );
  }
}
