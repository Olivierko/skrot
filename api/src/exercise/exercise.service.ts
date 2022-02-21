import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pagination, toPaginationResult } from '@/utility/pagination';
import { ExerciseEntity } from '@/exercise/exercise.entity';
import { ExerciseDto } from '@/exercise/exercise.dto';

@Injectable()
export class ExerciseService {
    constructor(
        @InjectRepository(ExerciseEntity)
        private readonly repository: Repository<ExerciseEntity>
    ) { }

    private transform(dto: ExerciseDto): ExerciseEntity {
        const entity = new ExerciseEntity();
        entity.name = dto.name;
        entity.description = dto.description;
        entity.categoryId = dto.categoryId;
        entity.muscleGroupId = dto.muscleGroupId;

        return entity;
    }

    async create(dto: ExerciseDto): Promise<ExerciseEntity> {
        const entity = this.transform(dto);
        return await this.repository.save(entity);
    }

    async findAll(page: number, take: number): Promise<Pagination<ExerciseEntity>> {
        const query = this.repository.createQueryBuilder('exercise');
        query.orderBy('exercise.name', 'ASC');

        return await toPaginationResult(query, page, take);
    }

    async findOne(id: string): Promise<ExerciseEntity> {
        return await this.repository.findOne(id);
    }

    async update(id: string, dto: ExerciseDto): Promise<void> {
        const entity = this.transform(dto);
        await this.repository.update(id, entity);
    }

    async remove(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}