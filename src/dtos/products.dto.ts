import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, MaxLength } from "class-validator";

export class CreateProductDto {
    @ApiProperty({
        description: 'The name of the product',
        example: 'LG monitor',
        type: 'string'
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    name: string;

    @ApiProperty({
        description: 'The description of the product',
        example: 'el mejor monitor gamer',
        type:'string'
    })
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty({
        description: 'The price of the product',
        example: 22,
        type: 'number'
    })
    @IsNumber()
    @IsNotEmpty()
    price: number;
    
    @ApiProperty({
        description: 'The stock of the product',
        example: 12,
        type: 'number'
    })
    @IsNumber()
    @IsNotEmpty()
    stock: number;

    @ApiProperty({
        description: 'The image url of the product',
        example: 'https://i.ytimg.com/vi/_LbbKKuimaM/maxresdefault.jpg',
        type:'string'
    })
    @IsNotEmpty()
    @IsUrl()
    imgUrl: string;

    @IsString()
    category: string
}

export class UpdateProductDto {
    @ApiProperty({
        description: 'The name of the product',
        example: 'LG monitor',
        type: 'string'
    })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    name: string;

    @ApiProperty({
        description: 'The description of the product',
        example: 'el mejor monitor gamer',
        type:'string'
    })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty({
        description: 'The price of the product',
        example: 22,
        type: 'number'
    })
    @IsOptional()
    @IsNumber()
    @IsNotEmpty()
    price: number;
    
    @ApiProperty({
        description: 'The stock of the product',
        example: 12,
        type: 'number'
    })
    @IsOptional()
    @IsNumber()
    @IsNotEmpty()
    stock: number;

    @ApiProperty({
        description: 'The image url of the product',
        example: 'https://i.ytimg.com/vi/_LbbKKuimaM/maxresdefault.jpg',
        type:'string'
    })
    @IsOptional()
    @IsNotEmpty()
    @IsUrl()
    imgUrl: string;
}