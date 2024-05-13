import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class BodyDetailJobType {
    @IsNotEmpty()
    @IsString()
    detailTypeName: string

    @IsNotEmpty()
    @IsNumber()
    jobTypeId: number
}