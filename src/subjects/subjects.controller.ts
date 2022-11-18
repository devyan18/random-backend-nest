import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
  HttpException,
} from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { SubjectsService } from './subjects.service';
import { JwtAuthGuard } from 'src/auth/wt-auth.guard';
import { UsersService } from 'src/users/users.service';
import { IsAdminGuard } from 'src/auth/is-admin.guard';

@Controller('subjects')
export class SubjectsController {
  constructor(
    private readonly subjectsService: SubjectsService,
    private usersService: UsersService,
  ) {}

  @UseGuards(IsAdminGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createSubjectDto: CreateSubjectDto, @Request() req) {
    const isAdmin = await this.usersService.isAdmin(req.user._id);

    if (!isAdmin) {
      throw new HttpException(
        'You are not authorized to update this subject',
        401,
      );
    }

    return this.subjectsService.create(createSubjectDto);
  }

  @Get()
  findAll() {
    return this.subjectsService.findAll();
  }

  @Get(':subjectId')
  findOne(@Param('subjectId') subjectId: string) {
    return this.subjectsService.findOne(subjectId);
  }

  @UseGuards(IsAdminGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(':subjectId')
  async update(
    @Param('subjectId') subjectId: string,
    @Body() updateSubjectDto: UpdateSubjectDto,
    @Request() req,
  ) {
    const isAdmin = await this.usersService.isAdmin(req.user._id);

    if (!isAdmin) {
      throw new HttpException(
        'You are not authorized to update this subject',
        401,
      );
    }

    return this.subjectsService.update(subjectId, updateSubjectDto);
  }

  @UseGuards(IsAdminGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':subjectId')
  async remove(@Param('subjectId') subjectId: string, @Request() req) {
    const isAdmin = await this.usersService.isAdmin(req.user._id);

    if (!isAdmin) {
      throw new HttpException(
        'You are not authorized to update this subject',
        401,
      );
    }

    return this.subjectsService.remove(subjectId);
  }
}
