import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { ProductRepository } from "./products.repository";
import { CreateProductDto, UpdateProductDto } from "src/dtos/products.dto";
// import IProduct from "src/interfaces/IProduct";

@Injectable()

export class ProductService implements OnApplicationBootstrap {
    constructor(private productRepository: ProductRepository){}
    async onApplicationBootstrap() {
        await this.seedProducts()
    }
    getProducts(page: number, limit: number) {
        return this.productRepository.getProducts(page, limit);
    }
    getProductById(id: string) {
        return this.productRepository.getProductById(id);
    }

    createProduct(product: CreateProductDto) {
        return this.productRepository.createProduct(product);
    }
    updateProduct(id: string, product: UpdateProductDto) {
        return this.productRepository.updateProduct(id, product);
    }

    async seedProducts() {
        return await this.productRepository.addProducts();
    }
    deleteProduct(id: string) {
        return this.productRepository.deleteProduct(id);
    }
}