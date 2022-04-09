import {IsBoolean, IsMongoId} from 'class-validator';
import {Types} from 'mongoose';

export class LikesDto {

  @IsBoolean()
  readonly liked: boolean;

  @IsMongoId()
  readonly userId: Types.ObjectId;

  @IsMongoId()
  readonly postId: Types.ObjectId;
}
