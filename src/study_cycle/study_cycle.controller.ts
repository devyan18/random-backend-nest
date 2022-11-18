import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  HttpException,
} from '@nestjs/common';
import { StudyCycleService } from './study_cycle.service';
import { CreateStudyCycleDto } from './dto/create-study_cycle.dto';
import { UpdateStudyCycleDto } from './dto/update-study_cycle.dto';
import { JwtAuthGuard } from 'src/auth/wt-auth.guard';
import { UsersService } from 'src/users/users.service';
import { IsAdminGuard } from 'src/auth/is-admin.guard';

@Controller('api/study-cycle')
export class StudyCycleController {
  constructor(
    private readonly studyCycleService: StudyCycleService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(IsAdminGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createStudyCycleDto: CreateStudyCycleDto) {
    return await this.studyCycleService.create(createStudyCycleDto);
  }

  @Get()
  async findAll() {
    return await this.studyCycleService.findAll();
  }

  @Get(':studyCycleId')
  async findOne(@Param('studyCycleId') studyCycleId: string) {
    const studyCycle = await this.studyCycleService.findOne(studyCycleId);

    if (!studyCycle) {
      throw new HttpException('Study Cycle not found', 404);
    }
    return studyCycle;
  }

  @UseGuards(IsAdminGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(':studyCycleId')
  async update(
    @Param('studyCycleId') studyCycleId: string,
    @Body() updateStudyCycleDto: UpdateStudyCycleDto,
  ) {
    return await this.studyCycleService.update(
      studyCycleId,
      updateStudyCycleDto,
    );
  }

  @UseGuards(IsAdminGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':studyCycleId')
  async remove(@Param('studyCycleId') studyCycleId: string, @Request() req) {
    const isAdmin = await this.usersService.isAdmin(req.user.userId);

    if (!isAdmin) {
      throw new HttpException(
        'You are not authorized to update this subject',
        401,
      );
    }
    return await this.studyCycleService.remove(studyCycleId);
  }
}
