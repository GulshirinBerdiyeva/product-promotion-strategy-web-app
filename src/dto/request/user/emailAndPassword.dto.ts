import {IsEmail, IsNotEmpty, Length} from 'class-validator';

export class EmailAndPasswordDto {
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @Length(6, 10)
    password: string;
}
