import { PartialType } from '@nestjs/mapped-types';
import { CreateStudyCycleDto } from './create-study_cycle.dto';

export class UpdateStudyCycleDto extends PartialType(CreateStudyCycleDto) {}
