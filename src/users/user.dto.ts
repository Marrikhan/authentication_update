import { IsEmail, isEmail, IsNotEmpty, IsString } from "class-validator";
export class User   {
    @IsString()
    name: string;
    @IsEmail()
    email: string;
    username: string;
    @IsNotEmpty()
    password: string;
}