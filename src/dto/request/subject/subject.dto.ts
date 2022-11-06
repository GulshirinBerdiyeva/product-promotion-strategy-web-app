import {IsNotEmpty, MaxLength} from 'class-validator';

export class SubjectDto {
    @IsNotEmpty()
    @MaxLength(50)
    readonly title: string;
}
