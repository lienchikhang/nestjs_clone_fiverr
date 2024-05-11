import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator"

export class BodyDto {
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsStrongPassword()
    password: string
}