import {IsMongoId, IsNotEmpty} from 'class-validator';

export class PostDto {
    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    @IsMongoId()
    subjectId: string;
}
