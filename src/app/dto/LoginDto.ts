import {
    IsString,
    IsDefined,
    IsOptional,
    IsNumber,
} from "class-validator";

/**
 * Data transfer object (DTO) with expected fields for creating users
 */
export class LoginDto {

    @IsDefined()
    @IsString()
    public phoneNumber: string;

    @IsDefined()
    @IsString()
    public password: string;
}
