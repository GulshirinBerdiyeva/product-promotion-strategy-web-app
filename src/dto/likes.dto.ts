import { IsBoolean, IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

export class LikesDto {
  @IsBoolean()
  readonly liked: boolean;

  @IsMongoId()
  readonly userID: Types.ObjectId;

  @IsMongoId()
  readonly postID: Types.ObjectId;
}
