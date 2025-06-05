import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {CreateCategoryDto} from './dto/create-category.dto';
import {UpdateCategoryDto} from './dto/update-category.dto';
import {Repository} from "typeorm";
import {Category} from "./entities/category.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
    ) {
    }
    async create(createCategoryDto: CreateCategoryDto, id: number) {
        const isExist = await this.categoryRepository.findBy({
            user: {id},
            title: createCategoryDto.title
        })
        if (isExist.length) throw new BadRequestException("Category already exists");
        const category = {
            title: createCategoryDto.title,
            user: {id}
        }
        return await this.categoryRepository.save(category);
    }
    async findAll(id: number) {
        return await this.categoryRepository.find({
            where: {
                user:{id}
            },
            relations:{
                transactions: true
            }
        });
    }
    async findOne(id: number) {
        const category = await this.categoryRepository.findOne({
            where: {id},
            relations:{
                user: true,
                transactions: true
            }
        })
        console.log('Category full:', JSON.stringify(category, null, 2));
        if(!category) throw new NotFoundException('Category not found');
        return category
    }
    async update(id: number, updateCategoryDto: UpdateCategoryDto) {
        const existingCategory  = await this.categoryRepository.findOne({
            where: {id}
        })
        if(!existingCategory) throw new NotFoundException('Category not found');

        await this.categoryRepository.update(id, updateCategoryDto);
        return this.categoryRepository.findOne({ where: { id } });
    }
    async remove(id: number) {
        const category = await this.categoryRepository.findOne({ where: { id } });

        if (!category) {
            throw new NotFoundException('Category not found');
        }

        await this.categoryRepository.delete(id);

        return { message: 'Category deleted successfully' };
    }


}
