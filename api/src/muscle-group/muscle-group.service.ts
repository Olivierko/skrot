import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pagination, toPaginationResult } from '@/utility/pagination';
import { MuscleGroupEntity } from '@/muscle-group/muscle-group.entity';
import { MuscleGroupDto } from '@/muscle-group/muscle-group.dto';

@Injectable()
export class MuscleGroupService {
    constructor(
        @InjectRepository(MuscleGroupEntity)
        private readonly repository: Repository<MuscleGroupEntity>
    ) { }

    private transform(dto: MuscleGroupDto): MuscleGroupEntity {
        const entity = new MuscleGroupEntity();
        entity.name = dto.name;

        return entity;
    }

    async create(dto: MuscleGroupDto): Promise<MuscleGroupEntity> {
        const entity = this.transform(dto);
        return await this.repository.save(entity);
    }

    async findAll(page: number, take: number): Promise<Pagination<MuscleGroupEntity>> {
        const query = this.repository.createQueryBuilder('muscle-group');
        query.orderBy('muscle-group.name', 'ASC');

        return await toPaginationResult(query, page, take);
    }

    async findOne(id: string): Promise<MuscleGroupEntity> {
        return await this.repository.findOne(id);
    }

    async update(id: string, dto: MuscleGroupDto): Promise<void> {
        const entity = this.transform(dto);
        await this.repository.update(id, entity);
    }

    async remove(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}