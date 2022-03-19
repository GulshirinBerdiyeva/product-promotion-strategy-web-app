import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export type PostDocument = Post & Document;

@Schema()
export class Post {

  @Prop({
    type: Types.ObjectId,
    unique: true
  })
  id: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop([String])
  photoFileName: string[];

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
    ref: 'Subject',
    required: true,
  })
  subjectId: Types.ObjectId;
}

export const PostModel = SchemaFactory.createForClass(Post);
