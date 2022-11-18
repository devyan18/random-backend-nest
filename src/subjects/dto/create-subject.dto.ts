import { IsNotEmpty } from 'class-validator';
import { Subject } from '../entities/subject.entity';

export class CreateSubjectDto implements Partial<Subject> {
  @IsNotEmpty()
  subject_name: string;

  @IsNotEmpty()
  career: string;

  teachers?: string[];
}
