import {IsBoolean, IsDate, IsMongoId, IsNotEmpty} from 'class-validator';
import {Types} from 'mongoose';

export class CommentReplyDto {

  @IsMongoId()
  readonly postId: Types.ObjectId;

  @IsMongoId()
  readonly commentId: Types.ObjectId;

  @IsMongoId()
  readonly authorId: Types.ObjectId;

  @IsMongoId()
  readonly repliedAuthorId: Types.ObjectId;

  @IsNotEmpty()
  readonly comment: string;

  @IsBoolean()
  readonly isPositive: boolean;

  @IsDate()
  readonly date: Date;
}
