import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class DetailJobTypeLink {
    @IsNotEmpty()
    @IsString()
    detailTypeLinkName: string
}

export class BodyDetailJobTypeLink {
    @IsArray()
    links: DetailJobTypeLink[]

    @IsNotEmpty()
    @IsNumber()
    jobDetailTypeId: number
}