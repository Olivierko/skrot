import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MuscleGroupService } from '@/muscle-group/muscle-group.service';
import { MuscleGroupEntity } from '@/muscle-group/muscle-group.entity';
import { MuscleGroupController } from '@/muscle-group/muscle-group.controller';

@Module({
    imports: [TypeOrmModule.forFeature([MuscleGroupEntity])],
    providers: [MuscleGroupService],
    controllers: [MuscleGroupController],
    exports: []
})
export class MuscleGroupModule { }