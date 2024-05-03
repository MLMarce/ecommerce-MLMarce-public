import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, ParseUUIDPipe, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ProductService } from "./products.service";
import { AuthGuard } from "src/guards/auth.guard";
import { RolesGuard } from "src/guards/roles.guards";
import { Roles } from "src/decorators/roles.decorators";
import { Role } from "src/roles.enum";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import {CreateProductDto, UpdateProductDto} from "src/dtos/products.dto";

@ApiTags('products')
@Controller('products')

export class ProductController {
    constructor(private readonly productService: ProductService){}

    @Get() 
    @HttpCode(200)
    getProducts(@Query('page', ParseIntPipe) page:number = 1, @Query('limit', ParseIntPipe) limit:number = 5){
        return this.productService.getProducts(page, limit);
    }

    @Get(':id')
    @HttpCode(200)
    getProductById(@Param('id', ParseUUIDPipe) id: string){
        return this.productService.getProductById(id);
    }
    @Post('seeder')
    seedProduct(){
        return this.productService.seedProducts();
    }

    @ApiBearerAuth()
    @Post()
    @UseGuards(AuthGuard)
    @HttpCode(201)
    createProduct(@Body() product: CreateProductDto){
        console.log(product)
        return this.productService.createProduct(product);
    }

    @ApiBearerAuth()
    @Put(':id')
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    @HttpCode(200)
    updateProduct(@Param('id', ParseUUIDPipe) id:string, @Body() product: UpdateProductDto){
        return this.productService.updateProduct(id, product);
    }

    @ApiBearerAuth()
    @Delete(':id')
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    @HttpCode(200)
    deleteProduct(@Param('id', ParseUUIDPipe) id: string){
        return this.productService.deleteProduct(id);
    }

    
}