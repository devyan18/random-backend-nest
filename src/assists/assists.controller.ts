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
import { AssistsService } from './assists.service';
import { CreateAssistDto } from './dto/create-assist.dto';
import { UpdateAssistDto } from './dto/update-assist.dto';

@Controller('api/assists')
export class AssistsController {
  constructor(private readonly assistsService: AssistsService) {}

  @UseGuards(IsAdminGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createAssistDto: CreateAssistDto) {
    return this.assistsService.create(createAssistDto);
  }

  @Get()
  findAll() {
    return this.assistsService.findAll();
  }

  @Get(':assistId')
  findOne(@Param('assistId') assistId: string) {
    return this.assistsService.findOne(assistId);
  }

  @UseGuards(IsAdminGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(':assistId')
  update(
    @Param('assistId') assistId: string,
    @Body() updateAssistDto: UpdateAssistDto,
  ) {
    return this.assistsService.update(assistId, updateAssistDto);
  }

  @UseGuards(IsAdminGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':assistId')
  remove(@Param('assistId') assistId: string) {
    return this.assistsService.remove(assistId);
  }
}
