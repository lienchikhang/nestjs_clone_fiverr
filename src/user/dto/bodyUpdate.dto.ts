import { IsBoolean, IsDate, IsEmail, IsEmpty, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from "class-validator"

export class BodyUpdateDto {

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    full_name?: string

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    pass_word?: string

    @IsOptional()
    @IsNotEmpty()
    @IsPhoneNumber()
    phone?: string

    @IsOptional()
    @IsNotEmpty()
    @IsDate()
    birth_day?: Date

    @IsOptional()
    @IsNotEmpty()
    @IsBoolean()
    gender?: boolean

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    skill?: string

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    certification?: string

}