import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pagination, toPaginationResult } from '@/utility/pagination';
import { CategoryEntity } from '@/category/category.entity';
import { CategoryDto } from '@/category/category.dto';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(CategoryEntity)
        private readonly repository: Repository<CategoryEntity>
    ) { }

    private transform(dto: CategoryDto): CategoryEntity {
        const entity = new CategoryEntity();
        entity.name = dto.name;

        return entity;
    }

    async create(dto: CategoryDto): Promise<CategoryEntity> {
        const entity = this.transform(dto);
        return await this.repository.save(entity);
    }

    async findAll(page: number, take: number): Promise<Pagination<CategoryEntity>> {
        const query = this.repository.createQueryBuilder('category');
        query.orderBy('category.name', 'ASC');

        return await toPaginationResult(query, page, take);
    }

    async findOne(id: string): Promise<CategoryEntity> {
        return await this.repository.findOne(id);
    }

    async update(id: string, dto: CategoryDto): Promise<void> {
        const entity = this.transform(dto);
        await this.repository.update(id, entity);
    }

    async remove(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}