import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "src/entities/product.entity";
import { Repository } from "typeorm";
import * as data from '../data.json'
import { Category } from "src/entities/category.entity";
import { CreateProductDto, UpdateProductDto } from "src/dtos/products.dto";

@Injectable()

export class ProductRepository {

    constructor(
        @InjectRepository(Product) private readonly productRepository: Repository<Product>,
        @InjectRepository(Category) private readonly categoryRepository: Repository<Category>
    ) { }

    async getProducts(page: number, limit: number) {
        const products = await this.productRepository.find()
        const start = (page - 1) * limit;
        const end = start + limit;
        const actualProducts = products.slice(start, end);
        return actualProducts;
    }

    async getProductById(id: string) {
        const productFound = await this.productRepository.findOneBy({ id });
        if (!productFound) throw new NotFoundException('Product not found');
        return productFound;
    }

    async createProduct(product: CreateProductDto) {
        const category = await this.categoryRepository.findOne({where:{name: product.category}})
        
        const newProduct = new Product()
        newProduct.name = product.name;
        newProduct.description = product.description;
        newProduct.price = product.price;
        newProduct.stock = product.stock;
        newProduct.imgUrl = product.imgUrl;
        newProduct.category = category
        await this.productRepository.upsert(newProduct, ["name"]);

        return "Product created successfully"

    }

    async updateProduct(id: string, product: UpdateProductDto) {
        const productFound = await this.productRepository.findOneBy({ id });
        if (!productFound) throw new NotFoundException('Product not found');
        return await this.productRepository.update(id, product)
    }

    async deleteProduct(id: string) {
        const productFound = await this.productRepository.findOneBy({ id });
        if (!productFound) throw new NotFoundException('Product not found')
        await this.productRepository.delete(id)
        return `Product with ID: ${productFound.id} has been deleted`
    }

    async addProducts() {
        try {
            data.map(async product => {
                const category = await this.categoryRepository.findOneBy({ name: product.category })
                console.log(category)
                const newProduct = new Product();
                newProduct.name = product.name;
                newProduct.description = product.description;
                newProduct.price = product.price;
                newProduct.stock = product.stock;
                newProduct.description = product.description;
                newProduct.imgUrl = product.imgUrl;
                newProduct.category = category;
                await this.productRepository.upsert(newProduct, ["name"]);
            })
            return "Product added successfully";
        } catch (error) {
            throw new BadRequestException('Product could not be added');
        }
    }
}