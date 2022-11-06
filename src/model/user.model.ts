import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document, Types} from 'mongoose';
import {UserRole} from './type/userRole.type';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({
        type: Types.ObjectId,
        unique: true
    })
    id: Types.ObjectId;

    @Prop({required: true})
    firstName: string;

    @Prop({required: true})
    lastName: string;

    @Prop({required: true})
    username: string;

    @Prop({required: true})
    birthDate: Date;

    @Prop({required: true})
    passwordHash: string;

    @Prop()
    refreshToken: string;

    @Prop({
        required: true,
        enum: Object.values(UserRole),
    })
    role: string;

    @Prop({
        required: true,
        unique: true
    })
    email: string;

    @Prop({
        unique: true
    })
    socialMediaUrl: string;

    @Prop({default: 0})
    responseCounter: number;

    @Prop()
    avatarFileName: string;
}

export const UserModel = SchemaFactory.createForClass(User);
