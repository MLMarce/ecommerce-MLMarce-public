import { ApiProperty } from "@nestjs/swagger";
import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from "class-validator";

export class OrderDto {
    @ApiProperty({
        description: "The id of the user who placed the order",
        type: String,
        example: "123e4567-e89b-12d3-a456-426655440000"
    })
    @IsNotEmpty()
    @IsUUID()
    userId: string;

    @ApiProperty({
        description: "Array of products id",
        type: Array,
        example: [
            {id: "123e4567-e89b-12d3-a456"},
            {id: "123e4567-e89b-12d3-a456"}
        ]
    })
    @IsNotEmpty()
    @IsArray()
    @ArrayMinSize(1)
    products: [
        {id: string}
    ]
}