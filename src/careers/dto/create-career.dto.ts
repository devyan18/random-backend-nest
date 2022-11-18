import { IsNotEmpty } from 'class-validator';
import { Career } from '../entities/career.entity';

export class CreateCareerDto implements Career {
  @IsNotEmpty()
  career_name: string;

  @IsNotEmpty()
  career_description: string;

  @IsNotEmpty()
  current_study_cycle: string;
}
