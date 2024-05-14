import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class BodyDetailJobType {
    @IsNotEmpty()
    @IsString()
    detailTypeName: string

    @IsNotEmpty()
    @IsNumber()
    jobTypeId: number
}

export class BodyDetailJobTypeUpdate {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    detail_type_name: string

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    job_type_id: number
}
