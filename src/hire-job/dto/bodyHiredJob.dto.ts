import { IsNotEmpty, IsNumber } from "class-validator";

export class bodyHiredJobDto {
    @IsNotEmpty()
    @IsNumber()
    job_id: number
}