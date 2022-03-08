import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export type LikesDocument = Likes & Document;

@Schema()
export class Likes {
  @Prop({ default: false })
  liked: boolean;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  })
  userID: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: 'Post',
    required: true,
  })
  postID: Types.ObjectId;
}

export const LikesSchema = SchemaFactory.createForClass(Likes);
