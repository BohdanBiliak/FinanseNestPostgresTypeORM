import {IsEmail, MaxLength, MinLength} from "class-validator";

export class CreateUserDto {
    @IsEmail()
    email: string;
    @MinLength(6, {message: 'passord must be more then 6 symbols'})
    @MaxLength(20)
    password: string;
}
