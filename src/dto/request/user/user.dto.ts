import {IsDate, IsEmail, IsNotEmpty, Length, MaxLength} from 'class-validator';
import {Type} from "class-transformer";

export class UserDto {
    @IsNotEmpty()
    @MaxLength(25)
    readonly firstName: string;

    @IsNotEmpty()
    @MaxLength(25)
    readonly lastName: string;

    @IsNotEmpty()
    @MaxLength(50)
    readonly username: string;

    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    readonly birthDate: Date;

    @IsNotEmpty()
    @Length(6, 10)
    password: string;

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    readonly socialMediaUrl: string;

    readonly avatarFileName: string;
}
