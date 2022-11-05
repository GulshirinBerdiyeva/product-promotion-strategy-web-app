import {IsBoolean, IsDate, IsMongoId, IsNotEmpty} from 'class-validator';
import {Types} from 'mongoose';

export class CommentDto {
    @IsNotEmpty()
    readonly comment: string;

    @IsBoolean()
    readonly isPositive: boolean;

    @IsDate()
    readonly date: Date;

    @IsMongoId()
    readonly userId: Types.ObjectId;

    @IsMongoId()
    readonly postId: Types.ObjectId;
}
