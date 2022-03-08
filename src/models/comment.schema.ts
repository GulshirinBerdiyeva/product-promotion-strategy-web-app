import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
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
  userID: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: 'Post',
    required: true,
  })
  postID: Types.ObjectId;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
