import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateStudyCycleDto } from './dto/create-study_cycle.dto';
import { UpdateStudyCycleDto } from './dto/update-study_cycle.dto';
import { StudyCycle, StudyCycleDocument } from './schemas/study_cycle.schema';

@Injectable()
export class StudyCycleService {
  constructor(
    @InjectModel(StudyCycle.name)
    private studyCycleModel: Model<StudyCycleDocument>,
  ) {}

  async create(createStudyCycleDto: CreateStudyCycleDto) {
    return await this.studyCycleModel.create(createStudyCycleDto);
  }

  async findAll() {
    return await this.studyCycleModel.find();
  }

  async findOne(studyCycleId: string) {
    try {
      return await this.studyCycleModel.findOne({ _id: studyCycleId });
    } catch (error) {
      return null;
    }
  }

  async update(studyCycleId: string, updateStudyCycleDto: UpdateStudyCycleDto) {
    return await this.studyCycleModel.findOneAndUpdate(
      { _id: studyCycleId },
      updateStudyCycleDto,
      { new: true },
    );
  }

  async remove(studyCycleId: string) {
    return await this.studyCycleModel.findOneAndDelete({ _id: studyCycleId });
  }
}
