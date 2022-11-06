import {IsBoolean, IsMongoId} from 'class-validator';
import {Types} from 'mongoose';

export class LikesDto {
    @IsBoolean()
    readonly liked: boolean;

    @IsMongoId()
    readonly postId: Types.ObjectId;
}
