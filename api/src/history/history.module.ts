import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoryService } from '@/history/history.service';
import { WorkoutEntity } from '@/workout/workout.entity';
import { HistoryController } from '@/history/history.controller';

@Module({
    imports: [TypeOrmModule.forFeature([WorkoutEntity])],
    providers: [HistoryService],
    controllers: [HistoryController],
    exports: []
})
export class HistoryModule { }