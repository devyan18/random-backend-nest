import { IsDate, IsInstance, IsNotEmpty, IsObject } from 'class-validator';
import { Assist, Presense } from '../entities/assist.entity';

export class CreateAssistDto implements Assist {
  @IsNotEmpty()
  @IsDate()
  date: Date;

  @IsNotEmpty()
  @IsObject()
  @IsInstance(Array<Presense>)
  present: {
    user: string;
    is_present: boolean;
  }[];
}
