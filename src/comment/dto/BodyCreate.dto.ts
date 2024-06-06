import { IsDate, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class BodyCreateDto {


    @IsNotEmpty()
    content: string;

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    stars: number;

}