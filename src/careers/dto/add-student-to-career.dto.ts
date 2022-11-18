import { IsNotEmpty } from 'class-validator';

export class AddStudentToCareerDto {
  @IsNotEmpty()
  student: string;
}
