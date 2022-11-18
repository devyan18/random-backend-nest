import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Period as PeriodEntity } from '../entities/period.entity';

export type PeriodDocument = HydratedDocument<Period>;

@Schema({ timestamps: true })
export class Period implements PeriodEntity {
  @Prop({ type: Date })
  start_date: Date;

  @Prop({ type: Date })
  end_date: Date;

  @Prop({ type: Types.ObjectId, ref: 'Career', autopopulate: true })
  career: string;
}

export const PeriodSchema = SchemaFactory.createForClass(Period);
