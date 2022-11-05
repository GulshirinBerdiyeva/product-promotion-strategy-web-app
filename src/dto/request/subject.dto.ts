import {IsMongoId, IsNotEmpty, MaxLength} from 'class-validator';
import {Types} from "mongoose";

export class SubjectDto {
    @IsNotEmpty()
    @MaxLength(50)
    readonly title: string;

    @IsMongoId()
    readonly userId: Types.ObjectId;
}
