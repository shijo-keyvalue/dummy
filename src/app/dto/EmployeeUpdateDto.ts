import {
    IsString,
    IsDefined,
    IsOptional,
    IsNumber,
    IsDateString,
} from "class-validator";

/**
 * Data transfer object (DTO) with expected fields for creating users
 */
export class EmployeeUpdateDto {

    @IsOptional()
    @IsString()
    public name: string;

    @IsOptional()
    @IsString()
    public role: string;

    @IsOptional()
    @IsDateString()
    public joiningDate: Date;

    @IsOptional()
    @IsNumber()
    public experience: number;

    @IsOptional()
    @IsString()
    public status: string;
}
