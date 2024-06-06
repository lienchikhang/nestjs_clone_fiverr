import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class BodyUpdateDto {
    @IsOptional()
    @IsNotEmpty()
    content: string;

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    stars: number;
}