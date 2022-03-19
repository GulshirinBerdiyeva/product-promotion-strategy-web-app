import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { UserRole } from './type/userRole.type';

export type UserDocument = User & Document;

@Schema()
export class User {

  @Prop({
    type: Types.ObjectId,
    unique: true
  })
  id: Types.ObjectId;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true })
  password: string;

  @Prop()
  refreshTokenHash: string;

  @Prop({
    required: true,
    enum: Object.values(UserRole),
  })
  role: string;

  @Prop({
    // unique: true
  })
  email: string;

  @Prop({
    // unique: true
  })
  socialMediaUrl: string;

  @Prop()
  responseCounter: number;

  @Prop()
  photoFileName: string;
}

export const UserModel = SchemaFactory.createForClass(User);
