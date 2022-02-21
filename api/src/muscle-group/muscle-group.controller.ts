import { UseGuards, Post, Get, Controller, Query, Param, Patch, Delete, Body, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { Pagination } from '@/utility/pagination';
import { MuscleGroupEntity } from '@/muscle-group/muscle-group.entity';
import { MuscleGroupService } from '@/muscle-group/muscle-group.service';
import { MuscleGroupDto } from '@/muscle-group/muscle-group.dto';

@UseGuards(JwtAuthGuard)
@Controller('muscle-groups')
export class MuscleGroupController {
    constructor(private readonly service: MuscleGroupService) { }

    @Post()
    async create(@Body() dto: MuscleGroupDto): Promise<MuscleGroupEntity> {
        return await this.service.create(dto);
    }

    @Get()
    async index(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    ): Promise<Pagination<MuscleGroupEntity>> {
        return await this.service.findAll(page, 25);
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<MuscleGroupEntity> {
        return await this.service.findOne(id);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() dto: MuscleGroupDto): Promise<void> {
        return await this.service.update(id, dto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        return await this.service.remove(id);
    }
}