import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { User as UserEntity } from '../entities/user.entity';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User implements UserEntity {
  @Prop({ required: true, minlength: 3, maxlength: 50 })
  firstName: string;

  @Prop({ required: true, minlength: 3, maxlength: 50 })
  lastName: string;

  @Prop({ required: true })
  birthDate: Date;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
