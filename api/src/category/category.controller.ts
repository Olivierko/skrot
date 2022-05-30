import { UseGuards, Post, Get, Controller, Query, Param, Patch, Delete, Body, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { Pagination } from '@/utility/pagination';
import { CategoryEntity } from '@/category/category.entity';
import { CategoryService } from '@/category/category.service';
import { CategoryDto } from '@/category/category.dto';

@UseGuards(JwtAuthGuard)
@Controller('categories')
export class CategoryController {
    constructor(private readonly service: CategoryService) { }

    @Post()
    async create(@Body() dto: CategoryDto): Promise<CategoryEntity> {
        return await this.service.create(dto);
    }

    @Get()
    async index(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    ): Promise<Pagination<CategoryEntity>> {
        return await this.service.findAll(page, 100);
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<CategoryEntity> {
        return await this.service.findOne(id);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() dto: CategoryDto): Promise<void> {
        return await this.service.update(id, dto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        return await this.service.remove(id);
    }
}