import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class BodyCreateJobDto {

    @IsNotEmpty()
    @IsString()
    job_name: string

    @IsNotEmpty()
    @IsNumber()
    price: number

    @IsNotEmpty()
    @IsString()
    job_desc: string

    @IsNotEmpty()
    @IsString()
    job_short_desc: string

    // @IsNotEmpty()
    // @IsNumber()
    // job_creator: number

    @IsNotEmpty()
    @IsNumber()
    job_detail_type_id: number

    @IsNotEmpty()
    @IsNumber()
    job_detail_type_link_id: number
}