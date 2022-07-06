import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pagination, toPaginationResultTransform } from '@/utility/pagination';
import { WorkoutEntity, ExerciseEntryEntity, ExerciseSetEntryEntity } from '@/workout/workout.entity';
import { WorkoutDto, WorkoutListDto } from '@/workout/workout.dto';

@Injectable()
export class WorkoutService {
    constructor(
        @InjectRepository(WorkoutEntity)
        private readonly workoutRepository: Repository<WorkoutEntity>,
    ) { }

    private transform(dto: WorkoutDto): WorkoutEntity {
        const entity = new WorkoutEntity();
        entity.start = dto.start;
        entity.end = dto.end;
        entity.name = dto.name;
        entity.exercises = [];

        let exerciseOrder = 1;
        for (const exerciseEntryDto of dto.exercises) {
            const exerciseEntryEntitiy = new ExerciseEntryEntity();
            exerciseEntryEntitiy.exerciseId = exerciseEntryDto.exerciseId;
            exerciseEntryEntitiy.notes = exerciseEntryDto.notes;
            exerciseEntryEntitiy.order = exerciseOrder++;
            exerciseEntryEntitiy.sets = [];

            let setOrder = 1;
            for (const exerciseSetEntryDto of exerciseEntryDto.sets) {
                const exerciseSetEntryEntity = new ExerciseSetEntryEntity();
                exerciseSetEntryEntity.repititions = exerciseSetEntryDto.repititions;
                exerciseSetEntryEntity.weight = exerciseSetEntryDto.weight;
                exerciseSetEntryEntity.unit = exerciseSetEntryDto.unit;
                exerciseSetEntryEntity.order = setOrder++;

                exerciseEntryEntitiy.sets.push(exerciseSetEntryEntity);
            }

            entity.exercises.push(exerciseEntryEntitiy);
        }

        return entity;
    }

    async create(userId: string, dto: WorkoutDto): Promise<WorkoutEntity> {
        const entity = this.transform(dto);
        entity.userId = userId;
        return await this.workoutRepository.save(entity);
    }

    async findAll(page: number, take: number): Promise<Pagination<WorkoutListDto>> {
        const query = this.workoutRepository.createQueryBuilder('workout');
        query.innerJoinAndSelect('workout.exercises', 'exercises');
        query.leftJoinAndSelect('exercises.exercise', 'exercise');
        query.leftJoinAndSelect('exercise.muscleGroup', 'muscleGroup');
        query.orderBy('workout.start', 'DESC');

        const transform = (entity: WorkoutEntity): WorkoutListDto => {
            const dto = new WorkoutListDto();
            dto.id = entity.id;
            dto.userId = entity.userId;
            dto.start = entity.start;
            dto.end = entity.end;
            dto.name = entity.name;
            dto.muscleGroups = [...new Set(entity.exercises.flatMap(x => x.exercise.muscleGroup.name))];;

            return dto;
        };

        return await toPaginationResultTransform(query, page, take, transform);
    }

    async findOne(id: string): Promise<WorkoutEntity> {
        const workout = await this.workoutRepository.findOne(id, { relations: ['exercises', 'exercises.sets'] });
        
        // maintain sort order manually, not possible to sort relations in typeorm
        workout.exercises = workout.exercises.sort((a, b) => a.order - b.order);
        workout.exercises.forEach(x => x.sets = x.sets.sort((a, b) => a.order - b.order));

        return workout;
    }

    async update(id: string, dto: WorkoutDto): Promise<void> {
        const existing = await this.findOne(id);
        const entity = this.transform(dto);
        entity.id = existing.id;
        entity.userId = existing.userId;
        await this.workoutRepository.save(entity);
    }

    async remove(id: string): Promise<void> {
        await this.workoutRepository.delete(id);
    }
}