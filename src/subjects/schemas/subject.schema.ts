import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Subject as SubjectEntity } from '../entities/subject.entity';

export type SubjectDocument = HydratedDocument<Subject>;

@Schema({ timestamps: true })
export class Subject implements SubjectEntity {
  @Prop({ required: true })
  subject_name: string;

  @Prop({ type: Types.ObjectId, ref: 'Career', autopopulate: true })
  career: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User', autopopulate: true }] })
  teachers: string[];
}

export const SubjectSchema = SchemaFactory.createForClass(Subject);
