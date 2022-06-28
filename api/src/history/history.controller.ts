import { UseGuards, Get, Controller, Req, Query } from '@nestjs/common';
import { AuthModel } from '@/auth/auth.model';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { HistoryService } from '@/history/history.service';
import { HistoryExerciseDto, HistoryWorkoutDto } from '@/history/history.dto';

@UseGuards(JwtAuthGuard)
@Controller('history')
export class HistoryController {
    constructor(private readonly service: HistoryService) { }

    @Get('exercise')
    async exercise(@Req() req, @Query('id') id: string): Promise<HistoryExerciseDto[]> {
        const user = <AuthModel>req.user;
        return await this.service.exercise(id, user.id);
    }

    @Get('workouts')
    async workouts(@Req() req, @Query('since') since: string): Promise<HistoryWorkoutDto[]> {
        const user = <AuthModel>req.user;
        return await this.service.workouts(since, user.id);
    }
}