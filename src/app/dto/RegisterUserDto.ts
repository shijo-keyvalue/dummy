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
export class RegisterUserDto {

    @IsDefined()
    @IsString()
    public name: string;

    @IsDefined()
    @IsString()
    public password: string;

    @IsDefined()
    @IsString()
    public phoneNumber: string;

}
