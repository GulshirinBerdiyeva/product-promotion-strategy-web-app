import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRole } from './userRole';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  age: number;

  @Prop({
    required: true,
    enum: Object.values(UserRole),
  })
  role: string;

  @Prop()
  email: string;

  @Prop()
  socialMediaUrl: string;

  @Prop()
  responseCounter: number;

  @Prop()
  photoFileName: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  token: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
