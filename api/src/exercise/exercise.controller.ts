import { UseGuards, Post, Get, Controller, Query, Param, Patch, Delete, Body, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { Pagination } from '@/utility/pagination';
import { ExerciseEntity } from '@/exercise/exercise.entity';
import { ExerciseService } from '@/exercise/exercise.service';
import { ExerciseDto } from '@/exercise/exercise.dto';

@UseGuards(JwtAuthGuard)
@Controller('exercises')
export class ExerciseController {
    constructor(private readonly service: ExerciseService) { }

    @Post()
    async create(@Body() dto: ExerciseDto): Promise<ExerciseEntity> {
        return await this.service.create(dto);
    }

    @Get()
    async index(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    ): Promise<Pagination<ExerciseEntity>> {
        return await this.service.findAll(page, 25);
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<ExerciseEntity> {
        return await this.service.findOne(id);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() dto: ExerciseDto): Promise<void> {
        return await this.service.update(id, dto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        return await this.service.remove(id);
    }
}