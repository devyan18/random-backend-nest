import { Assist as AssistEntity, Presense } from '../entities/assist.entity';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Types } from 'mongoose';

export type AssistDocument = HydratedDocument<Assist>;

@Schema({ timestamps: true })
export class Assist implements AssistEntity {
  @Prop()
  date: Date;

  @Prop({
    type: [
      {
        user: { type: Types.ObjectId, ref: 'User', autopopulate: true },
        is_present: {
          type: Boolean,
          default: false,
        },
      },
    ],
  })
  present: Presense[];
}

export const AssistSchema = SchemaFactory.createForClass(Assist);
