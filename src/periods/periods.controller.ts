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
import { PeriodsService } from './periods.service';
import { CreatePeriodDto } from './dto/create-period.dto';
import { UpdatePeriodDto } from './dto/update-period.dto';
import { IsAdminGuard } from 'src/auth/is-admin.guard';
import { JwtAuthGuard } from 'src/auth/wt-auth.guard';

@Controller('api/periods')
export class PeriodsController {
  constructor(private readonly periodsService: PeriodsService) {}

  @UseGuards(IsAdminGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createPeriodDto: CreatePeriodDto) {
    return this.periodsService.create(createPeriodDto);
  }

  @Get()
  findAll() {
    return this.periodsService.findAll();
  }

  @Get(':periodId')
  findOne(@Param('periodId') periodId: string) {
    return this.periodsService.findOne(periodId);
  }

  @UseGuards(IsAdminGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(':periodId')
  update(
    @Param('periodId') periodId: string,
    @Body() updatePeriodDto: UpdatePeriodDto,
  ) {
    return this.periodsService.update(periodId, updatePeriodDto);
  }

  @UseGuards(IsAdminGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':periodId')
  remove(@Param('periodId') periodId: string) {
    return this.periodsService.remove(periodId);
  }
}
