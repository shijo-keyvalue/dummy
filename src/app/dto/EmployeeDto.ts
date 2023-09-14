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
export class EmployeeDto {

    @IsDefined()
    @IsString()
    public name: string;

    @IsDefined()
    @IsString()
    public role: string;

    @IsDefined()
    @IsDateString()
    public joiningDate: Date;

    @IsDefined()
    @IsNumber()
    public experience: number;

    @IsDefined()
    @IsString()
    public status: string;

    @IsDefined()
    @IsString()
    public employeeProofUrl: string;

    @IsDefined()
    @IsString()
    public email: string;

    @IsDefined()
    @IsString()
    public password: string;
}
