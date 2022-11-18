import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Career as CareerEntity } from '../entities/career.entity';

export type CareerDocument = HydratedDocument<Career>;

@Schema({ timestamps: true })
export class Career implements CareerEntity {
  @Prop({ type: String })
  career_name: string;

  @Prop({ type: String })
  career_description: string;

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'StudyCycle', autopopulate: true }],
  })
  study_cycles: string[];

  @Prop({ type: Types.ObjectId, ref: 'StudyCycle', autopopulate: true })
  current_study_cycle: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Period', autopopulate: true }] })
  periods: string[];

  @Prop({ type: Types.ObjectId, ref: 'User', autopopulate: true })
  students: string[];
}

export const CareerSchema = SchemaFactory.createForClass(Career);
