import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@/user/user.entity';
import { UserDto } from '@/user/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly repository: Repository<UserEntity>
    ) { }

    async create(dto: UserDto): Promise<UserEntity> {
        const entity = new UserEntity();
        entity.username = dto.username;
        entity.password = await bcrypt.hash(dto.password, 10);

        return await this.repository.save(entity);
    }

    async setRefreshToken(id: string, token: string): Promise<void> {
        const hashedToken = token ? await bcrypt.hash(token, 10) : null;
        this.repository.update(id, { refreshToken: hashedToken });
    }

    async findOne(username: string): Promise<UserEntity | undefined> {
        return await this.repository.findOne({ username: username });
    }
}