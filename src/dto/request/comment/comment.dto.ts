import {IsMongoId, IsNotEmpty} from 'class-validator';
import {Types} from 'mongoose';

export class CommentDto {
    @IsNotEmpty()
    readonly comment: string;

    @IsNotEmpty()
    @IsMongoId()
    readonly postId: Types.ObjectId;
}
