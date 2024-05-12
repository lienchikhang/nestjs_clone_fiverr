import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator"

export class BodyLoginDto {
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    password: string
}