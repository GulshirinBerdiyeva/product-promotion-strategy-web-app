import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ContentThemeDocument = ContentTheme & Document;

@Schema()
export class ContentTheme {
  @Prop({
    unique: true,
    required: true,
  })
  title: string;
}

export const ContentThemeSchema = SchemaFactory.createForClass(ContentTheme);
