import { UseGuards, Post, Get, Controller, Req, Query, Param, Patch, Delete, Body, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { AuthModel } from '@/auth/auth.model';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { Pagination } from '@/utility/pagination';
import { WorkoutEntity } from '@/workout/workout.entity';
import { WorkoutService } from '@/workout/workout.service';
import { WorkoutDto, WorkoutListDto } from '@/workout/workout.dto';

@UseGuards(JwtAuthGuard)
@Controller('workouts')
export class WorkoutController {
    constructor(private readonly service: WorkoutService) { }

    @Post()
    async create(@Req() req, @Body() dto: WorkoutDto): Promise<WorkoutEntity> {
        const user = <AuthModel>req.user;
        return await this.service.create(user.id, dto);
    }

    @Get()
    async index(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    ): Promise<Pagination<WorkoutListDto>> {
        return await this.service.findAll(page, 10);
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<WorkoutEntity> {
        return await this.service.findOne(id);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() dto: WorkoutDto): Promise<void> {
        return await this.service.update(id, dto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        return await this.service.remove(id);
    }
}