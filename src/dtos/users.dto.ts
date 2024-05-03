import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, MaxLength, MinLength} from "class-validator";

export class CreateUserDto {
    @ApiProperty({
        description: 'The email of the user',
        example: "example@example.com"
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'The name of the user',
        example: "Nombre Random"
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    name: string;

    @IsNotEmpty()
    @IsString()
    birthdate: string;

    @ApiProperty({
        description: 'The password of the user',
        example: "password"
    })
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(15)
    @Matches(/(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])(?=.*\d).{8,}/)
    password: string;

    @ApiProperty({
        description: "The confirmation password of the user",
        example: "password"
    })
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(15)
    @Matches(/(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])(?=.*\d).{8,}/)
    confirmPassword: string;

    @ApiProperty({
        description: 'The address of the user',
        example: "address 1234"
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(80)
    address: string;

    @ApiProperty({
        description: 'The phone number of the user',
        example: 1234567890
    })
    @IsNotEmpty()
    @IsNumber()
    phone: number;

    @ApiProperty({
        description: 'The country of the user',
        example: "Mexico"
    })
    @IsOptional()
    @IsString()
    @MinLength(5)
    @MaxLength(20)
    country: string;

    @ApiProperty({
        description: 'The city of the user',
        example: "Mexico City"
    })
    @IsOptional()
    @IsString()
    @MinLength(5)
    @MaxLength(20)
    city: string;

    @IsOptional()
    @IsEmpty()
    isAdmin: boolean;
}

export class UpdateUserDto {
    @IsOptional()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    name: string;

    @IsOptional()
    @MinLength(8)
    @MaxLength(15)
    @Matches(/(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])(?=.*\d).{8,}/)
    password: string;

    @IsOptional()
    @IsString()
    @MinLength(3)
    @MaxLength(80)
    address: string;

    @IsOptional()
    @IsNumber()
    phone: number;

    @IsOptional()
    @IsString()
    @MinLength(5)
    @MaxLength(20)
    country: string;

    @IsOptional()
    @IsString()
    @MinLength(5)
    @MaxLength(20)
    city: string;
}

export class LoginUserDto {
    @ApiProperty({
        description: 'The email of the user',
        example: "example@example.com"
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'The password of the user',
        example: "password"
    })
    @IsNotEmpty()
    password: string
}