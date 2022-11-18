import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePeriodDto } from './dto/create-period.dto';
import { UpdatePeriodDto } from './dto/update-period.dto';
import { Period, PeriodDocument } from './schemas/period.schema';

@Injectable()
export class PeriodsService {
  constructor(
    @InjectModel(Period.name) private periodModel: Model<PeriodDocument>,
  ) {}

  async create(createPeriodDto: CreatePeriodDto) {
    return await this.periodModel.create(createPeriodDto);
  }

  async findAll() {
    return await this.periodModel.find();
  }

  async findOne(subjectId: string) {
    return `This action returns a #${subjectId} period`;
  }

  async update(subjectId: string, updatePeriodDto: UpdatePeriodDto) {
    return await this.periodModel.findOneAndUpdate(
      { _id: subjectId },
      updatePeriodDto,
      { new: true },
    );
  }

  async remove(subjectId: string) {
    return await this.periodModel.findOneAndDelete({ _id: subjectId });
  }
}
