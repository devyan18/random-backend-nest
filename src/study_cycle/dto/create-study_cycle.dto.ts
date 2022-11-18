import { IsNotEmpty, Min } from 'class-validator';
import { StudyCycle } from '../entities/study_cycle.entity';

export class CreateStudyCycleDto implements StudyCycle {
  @IsNotEmpty()
  @Min(2000)
  year: number;
}
