import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { StudyCycle as StudyCycleEntity } from '../entities/study_cycle.entity';

export type StudyCycleDocument = HydratedDocument<StudyCycle>;

@Schema({ timestamps: true })
export class StudyCycle implements StudyCycleEntity {
  @Prop({ type: Number, unique: true })
  year: number;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Career', autopopulate: true }] })
  careers: string[];
}

export const StudyCycleSchema = SchemaFactory.createForClass(StudyCycle);
