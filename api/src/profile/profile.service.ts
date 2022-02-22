import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfileEntity } from '@/profile/profile.entity';
import { ProfileDto } from '@/profile/profile.dto';

@Injectable()
export class ProfileService {
    constructor(
        @InjectRepository(ProfileEntity)
        private readonly repository: Repository<ProfileEntity>
    ) { }

    private toDto(entity: ProfileEntity): ProfileDto {
        const dto = new ProfileDto();
        dto.unit = entity.unit;
        
        return dto;
    }

    private toEntity(dto: ProfileDto): ProfileEntity {
        const entity = new ProfileEntity();
        entity.unit = dto.unit;

        return entity;
    }

    async get(userId: string): Promise<ProfileDto> {
        const entity = await this.repository.findOne({ userId: userId });

        if (!entity) {
            return new ProfileDto();
        }

        const dto = this.toDto(entity);

        return dto;
    }

    async upsert(userId: string, dto: ProfileDto): Promise<void> {
        const entity = this.toEntity(dto);
        entity.userId = userId;

        const profile = await this.repository.findOne({ userId: userId });

        if (profile) {
            await this.repository.update(profile.id, entity);
        }
        else {
            await this.repository.save(entity);
        }
    }
}