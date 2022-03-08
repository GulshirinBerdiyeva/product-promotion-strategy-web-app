import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export type PostDocument = Post & Document;

@Schema()
export class Post {
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
  userID: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: 'ContentTheme',
    required: true,
  })
  contentThemeID: Types.ObjectId;
}

export const PostSchema = SchemaFactory.createForClass(Post);
