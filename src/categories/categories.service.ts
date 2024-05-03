import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';

@Injectable()
export class CategoriesService implements OnApplicationBootstrap {
    constructor(private readonly categoriesRepository: CategoriesRepository) {}

    async onApplicationBootstrap() {
        await this.seedCategories()
    }
    getCategories() {
        return  this.categoriesRepository.getCategories();
    }
    async seedCategories() {
        return await this.categoriesRepository.addCategories();
    }
}
