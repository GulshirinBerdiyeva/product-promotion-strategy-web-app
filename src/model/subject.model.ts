import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document, Types} from 'mongoose';

export type SubjectDocument = Subject & Document;

@Schema()
export class Subject {
    @Prop({
        type: Types.ObjectId,
        unique: true
    })
    id: Types.ObjectId;

    @Prop({
        unique: true,
        required: true,
    })
    title: string;
}

export const SubjectModel = SchemaFactory.createForClass(Subject);
