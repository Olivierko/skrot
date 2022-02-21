import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileService } from '@/profile/profile.service';
import { ProfileEntity } from '@/profile/profile.entity';
import { ProfileController } from '@/profile/profile.controller';

@Module({
    imports: [TypeOrmModule.forFeature([ProfileEntity])],
    providers: [ProfileService],
    controllers: [ProfileController],
    exports: []
})
export class ProfileModule { }