import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator"

export class BodyRegisterDto {
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsStrongPassword()
    password: string
}