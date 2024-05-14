import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class DetailJobTypeLink {
    @IsNotEmpty()
    @IsString()
    detailTypeLinkName: string
}

export class DetailJobTypeLinkUpdate {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    detail_type_link_name: string

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    job_detail_type_id: number

}

export class BodyDetailJobTypeLink {
    @IsArray()
    links: DetailJobTypeLink[]

    @IsNotEmpty()
    @IsNumber()
    jobDetailTypeId: number
}

export class BodyDetailJobTypeLinkUpdate {
    @IsOptional()
    @IsArray()
    links: DetailJobTypeLink[]

    @IsNotEmpty()
    @IsNumber()
    jobDetailTypeId: number
}