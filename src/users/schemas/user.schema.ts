import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User as UserEntity, StudyingCareer } from '../entities/user.entity';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User implements UserEntity {
  @Prop({ required: true, minlength: 3, maxlength: 50 })
  first_name: string;

  @Prop({ required: true, minlength: 3, maxlength: 50 })
  last_name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: false })
  isAdmin: boolean;

  @Prop({
    type: [
      {
        user: { type: Types.ObjectId, ref: 'Career', autopopulate: true },
        inassistences: { type: Number, default: 0 },
      },
    ],
  })
  studying_careers: StudyingCareer[];

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Subject', autopopulate: true }],
  })
  teaching_subjects: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
