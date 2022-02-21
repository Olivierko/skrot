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

    private transform(dto: ProfileDto): ProfileEntity {
        const entity = new ProfileEntity();
        entity.unit = dto.unit;

        return entity;
    }

    async get(userId: string): Promise<ProfileEntity> {
        return await this.repository.findOne({ userId: userId });
    }

    async upsert(userId: string, dto: ProfileDto): Promise<void> {
        const entity = this.transform(dto);
        entity.userId = userId;

        const profile = await this.get(userId);

        if (profile) {
            await this.repository.update(profile.id, entity);
        }
        else {
            await this.repository.save(entity);
        }
    }
}