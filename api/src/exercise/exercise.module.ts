import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExerciseService } from '@/exercise/exercise.service';
import { ExerciseEntity } from '@/exercise/exercise.entity';
import { ExerciseController } from '@/exercise/exercise.controller';

@Module({
    imports: [TypeOrmModule.forFeature([ExerciseEntity])],
    providers: [ExerciseService],
    controllers: [ExerciseController],
    exports: []
})
export class ExerciseModule { }