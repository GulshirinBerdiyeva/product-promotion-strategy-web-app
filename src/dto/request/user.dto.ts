import {IsEmail, IsEnum, IsNotEmpty, IsNumber, Length, MaxLength, Min} from 'class-validator';
import {UserRole} from '../../model/type/userRole.type';

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

  @IsNumber()
  @Min(0)
  readonly age: number;

  @IsNotEmpty()
  @Length(5, 10)
  password: string;

  refreshToken: string;

  @IsEnum(UserRole)
  role: string;

  @IsEmail()
  readonly email: string;

  readonly socialMediaUrl: string;

  @IsNumber()
  @Min(0)
  readonly responseCounter: number;

  readonly photoFileName: string;
}
