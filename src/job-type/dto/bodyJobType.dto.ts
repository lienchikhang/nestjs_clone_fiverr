import { IsNotEmpty, IsString } from "class-validator";

export class BodyJobType {
    @IsNotEmpty()
    @IsString()
    jobTypeName: string
}