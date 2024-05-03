import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "src/entities/category.entity";
import { Repository } from "typeorm";
import * as data from '../data.json'

@Injectable()
export class CategoriesRepository {
    constructor(@InjectRepository(Category) private readonly categoryRepository: Repository<Category>) { }


    async getCategories() {
        return await this.categoryRepository.find();
    }

    async addCategories() {
        const categories: string[] =  data.map(({ category }) => category)
        const set = new Set(categories)
        const categoriesToDB = [...set]

        await Promise.all(categoriesToDB.map(async category => {
            const newCategory = new Category()
            newCategory.name = category
            await this.categoryRepository.upsert(newCategory, ["name"])
        }))

        return "categories preloaded"
    }

}