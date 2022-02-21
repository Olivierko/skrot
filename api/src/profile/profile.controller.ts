import { UseGuards, Get, Controller, Req, Patch, Body } from '@nestjs/common';
import { AuthModel } from '@/auth/auth.model';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { ProfileEntity } from '@/profile/profile.entity';
import { ProfileService } from '@/profile/profile.service';
import { ProfileDto } from '@/profile/profile.dto';

@UseGuards(JwtAuthGuard)
@Controller('profile')
export class ProfileController {
    constructor(private readonly service: ProfileService) { }

    @Get()
    async get(@Req() req): Promise<ProfileEntity> {
        const user = <AuthModel>req.user;
        return await this.service.get(user.id);
    }

    @Patch()
    async update(@Req() req, @Body() dto: ProfileDto): Promise<void> {
        const user = <AuthModel>req.user;
        return await this.service.upsert(user.id, dto);
    }
}