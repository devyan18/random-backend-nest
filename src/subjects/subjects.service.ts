import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { Subject, SubjectDocument } from './schemas/subject.schema';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectModel(Subject.name) private subjectModel: Model<SubjectDocument>,
    private readonly userService: UsersService,
  ) {}

  async create(createSubjectDto: CreateSubjectDto) {
    return await this.subjectModel.create(createSubjectDto);
  }

  async findAll() {
    return await this.subjectModel.find();
  }

  async findOne(subjectId: string) {
    return await this.subjectModel.findOne({ _id: subjectId });
  }

  async update(subjectId: string, updateSubjectDto: UpdateSubjectDto) {
    return await this.subjectModel.findOneAndUpdate(
      { _id: subjectId },
      updateSubjectDto,
      { new: true },
    );
  }

  async remove(subjectId: string) {
    return await this.subjectModel.findOneAndDelete({ _id: subjectId });
  }

  async addTeacherToCareer(subjectId: string, teacherId: string) {
    const subjectWithNewTeacher = await this.subjectModel.findOneAndUpdate(
      { _id: subjectId },
      { $push: { teachers: teacherId } },
      { new: true },
    );

    await this.userService.addTeacherToUser(teacherId, subjectId);

    return subjectWithNewTeacher;
  }
}
