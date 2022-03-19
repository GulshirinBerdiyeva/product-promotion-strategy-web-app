import { IsDate, IsMongoId, IsNotEmpty, MaxLength } from 'class-validator';
import { Types } from 'mongoose';

export class PostDto {

  @IsNotEmpty()
  @MaxLength(50)
  readonly title: string;

  @IsNotEmpty()
  readonly description: string;

  @IsNotEmpty()
  readonly photoFileName: string;

  @IsDate()
  readonly date: Date;

  @IsMongoId()
  readonly userId: Types.ObjectId;

  @IsMongoId()
  readonly subjectId: Types.ObjectId;
}
