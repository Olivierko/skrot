import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkoutEntity } from '@/workout/workout.entity';
import { HistoryExerciseDto, HistoryWorkoutDto } from '@/history/history.dto';

@Injectable()
export class HistoryService {
    constructor(
        @InjectRepository(WorkoutEntity)
        private readonly repository: Repository<WorkoutEntity>
    ) { }

    async exercise(id: string, userId: string): Promise<HistoryExerciseDto[]> {
        const query = await this.repository
            .createQueryBuilder('workout')
            .innerJoinAndSelect('workout.exercises', 'exercise', 'exercise.exerciseId = :id', { id: id })
            .leftJoinAndSelect('exercise.sets', 'set')
            .orderBy('workout.start', 'DESC')
            .where('workout.userId = :userId', { userId: userId });
        
        const items = await query.take(20).getMany();

        const results = [];

        for (const workout of items) {
            let totalWeight = 0;
            let totalSets = 0;
            let totalRepititions = 0;
            let unit = '';
            let notes = [];

            for (const exercise of workout.exercises) {
                for (const set of exercise.sets) {

                    if (unit !== '' && unit !== set.unit) {
                        continue;
                    }

                    unit = set.unit;
                    totalWeight += set.repititions * set.weight;
                    totalSets += 1;
                    totalRepititions += set.repititions;
                }

                notes.push(exercise.notes);
            }

            const exerciseHistory = new HistoryExerciseDto();
            exerciseHistory.date = workout.start;
            exerciseHistory.totalWeight = totalWeight;
            exerciseHistory.totalSets = totalSets;
            exerciseHistory.totalRepititions = totalRepititions;
            exerciseHistory.unit = unit;
            exerciseHistory.notes = notes;

            results.push(exerciseHistory);
        }
        
        return results;
    }

    async workouts(since: string, userId: string): Promise<HistoryWorkoutDto[]> {
        const query = await this.repository
            .createQueryBuilder('workout')
            .orderBy('workout.start', 'DESC')
            .where('workout.userId = :userId', { userId: userId })
            .andWhere('workout.start >= :since', { since: since });

        const items = await query.getMany();

        const results = [];
        for (const workout of items) {
            const workoutHistory = new HistoryWorkoutDto();
            workoutHistory.start = workout.start;
            workoutHistory.end = workout.end;

            results.push(workoutHistory);
        }

        return results;
    }
}