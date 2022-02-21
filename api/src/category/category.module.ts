import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryService } from '@/category/category.service';
import { CategoryEntity } from '@/category/category.entity';
import { CategoryController } from '@/category/category.controller';

@Module({
    imports: [TypeOrmModule.forFeature([CategoryEntity])],
    providers: [CategoryService],
    controllers: [CategoryController],
    exports: []
})
export class CategoryModule { }