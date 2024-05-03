import { Injectable, NotFoundException } from '@nestjs/common';
import { FileUploadRepository } from './file-upload.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FileUploadService {
  constructor(
    private readonly fileUploadRepository: FileUploadRepository,
    @InjectRepository(Product) private readonly productRepository: Repository<Product>
  ) { }

  async uploadImage(productId: string, file: Express.Multer.File) {
    const productFound = await this.productRepository.findOneBy({ id: productId });
    if (!productFound) throw new NotFoundException('Product not found')

    const { secure_url } = await this.fileUploadRepository.uploadImage(file);

    await this.productRepository.update(productId, {
      imgUrl: secure_url
    })
    const updatedProduct = await this.productRepository.findOneBy({ id: productId })

    return updatedProduct;
  }

}
