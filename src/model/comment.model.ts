import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {

  @Prop({
    type: Types.ObjectId,
    unique: true
  })
  id: Types.ObjectId;

  @Prop({ required: true })
  comment: string;

  @Prop()
  isPositive: boolean;

  @Prop({ default: Date.now() })
  date: Date;

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

export const CommentModel = SchemaFactory.createForClass(Comment);
