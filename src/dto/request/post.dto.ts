import {IsDate, IsMongoId, IsNotEmpty, MaxLength} from 'class-validator';
import {Types} from 'mongoose';

export class PostDto {
    @IsNotEmpty()
    @MaxLength(50)
    readonly title: string;

    @IsNotEmpty()
    readonly description: string;

    @IsNotEmpty()
    readonly photoFileName: string[];

    @IsDate()
    readonly date: Date;

    @IsMongoId()
    userId: Types.ObjectId;

    @IsMongoId()
    subjectId: Types.ObjectId;
}
