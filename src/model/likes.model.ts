import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export type LikesDocument = Likes & Document;

@Schema()
export class Likes {

  @Prop({
    type: Types.ObjectId,
    unique: true
  })
  id: Types.ObjectId;

  @Prop({ default: false })
  liked: boolean;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  })
  userId: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: 'Post',
    required: true,
  })
  postId: Types.ObjectId;
}

export const LikesModel = SchemaFactory.createForClass(Likes);
