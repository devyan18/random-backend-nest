import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { IsAdminGuard } from 'src/auth/is-admin.guard';
import { JwtAuthGuard } from 'src/auth/wt-auth.guard';
import { CareersService } from './careers.service';
import { AddStudentToCareerDto } from './dto/add-student-to-career.dto';
import { CreateCareerDto } from './dto/create-career.dto';
import { UpdateCareerDto } from './dto/update-career.dto';

@Controller('api/careers')
export class CareersController {
  constructor(private readonly careersService: CareersService) {}

  @UseGuards(IsAdminGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createCareerDto: CreateCareerDto) {
    return await this.careersService.create(createCareerDto);
  }

  @UseGuards(IsAdminGuard)
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.careersService.findAll();
  }

  @Get(':careerId')
  findOne(@Param('careerId') careerId: string) {
    return this.careersService.findOne(careerId);
  }

  @UseGuards(IsAdminGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(':careerId')
  async update(
    @Param('careerId') careerId: string,
    @Body() updateCareerDto: UpdateCareerDto,
  ) {
    return this.careersService.update(careerId, updateCareerDto);
  }

  @UseGuards(IsAdminGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':careerId')
  async remove(@Param('careerId') careerId: string) {
    return this.careersService.remove(careerId);
  }

  @UseGuards(IsAdminGuard)
  @UseGuards(JwtAuthGuard)
  @Post(':careerId/students')
  async addStudent(
    @Param('careerId') careerId: string,
    @Body() addStudentTocareer: AddStudentToCareerDto,
  ) {
    return this.careersService.addStudent(careerId, addStudentTocareer.student);
  }
}
