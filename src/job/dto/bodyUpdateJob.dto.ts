import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class bodyUpdateJobDto {

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    job_name: string

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    price: number

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    job_desc: string

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    job_short_desc: string

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    job_creator: number

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    star: number

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    job_detail_type_id: number

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    job_detail_type_link_id: number

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    image: string

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    rate: number
}