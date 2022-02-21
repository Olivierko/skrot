import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkoutService } from '@/workout/workout.service';
import { WorkoutEntity } from '@/workout/workout.entity';
import { WorkoutController } from '@/workout/workout.controller';

@Module({
    imports: [TypeOrmModule.forFeature([WorkoutEntity])],
    providers: [WorkoutService],
    controllers: [WorkoutController],
    exports: []
})
export class WorkoutModule { }