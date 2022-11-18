import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAssistDto } from './dto/create-assist.dto';
import { UpdateAssistDto } from './dto/update-assist.dto';
import { Assist, AssistDocument } from './schemas/assist.schema';

@Injectable()
export class AssistsService {
  constructor(
    @InjectModel(Assist.name)
    private readonly assistModel: Model<AssistDocument>,
  ) {}

  async create(createAssistDto: CreateAssistDto) {
    return await this.assistModel.create(createAssistDto);
  }

  async findAll() {
    return await this.assistModel.find();
  }

  async findOne(assistId: string) {
    try {
      return await this.assistModel.find({ _id: assistId });
    } catch (error) {
      return null;
    }
  }

  async update(assistId: string, updateAssistDto: UpdateAssistDto) {
    return await this.assistModel.findOneAndUpdate(
      { _id: assistId },
      updateAssistDto,
      { new: true },
    );
  }

  async remove(assistId: string) {
    return await this.assistModel.findOneAndDelete({
      _id: assistId,
    });
  }
}
