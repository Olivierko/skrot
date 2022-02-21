import { Get, Controller, Req, Res, Post, UseGuards } from '@nestjs/common';
import { AuthModel } from '@/auth/auth.model';
import { AuthService } from '@/auth/auth.service';
import { LocalAuthGuard } from '@/auth/local-auth.guard';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { JwtRefreshGuard } from '@/auth/jwt-refresh.guard';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    profile(@Req() req) {
        const user = <AuthModel>req.user;
        return user;
    }

    @UseGuards(JwtRefreshGuard)
    @Get('refresh')
    async refresh(@Req() req, @Res({ passthrough: true }) res: Response) {
        const access = await this.authService.generateAccessToken(req.user);

        res.setHeader('Set-Cookie', [
            `Authentication=${access.token}; Path=/; SameSite=None; Max-Age=${access.maxAge}; HttpOnly; Secure`,
        ]);

        return {
            access: access,
        };
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Req() req, @Res({ passthrough: true }) res: Response) {
        const access = await this.authService.generateAccessToken(req.user);
        const refresh = await this.authService.generateRefreshToken(req.user);

        res.setHeader('Set-Cookie', [
            `Authentication=${access.token}; Path=/; SameSite=None; Max-Age=${access.maxAge}; HttpOnly; Secure`,
            `Refresh=${refresh.token}; Path=/; SameSite=None; Max-Age=${refresh.maxAge}; HttpOnly; Secure`,
        ]);

        return {
            access: access,
            refresh: refresh,
        };
    }

    @UseGuards(JwtAuthGuard)
    @Post('invalidate')
    async logout(@Req() req, @Res({ passthrough: true }) res: Response) {
        await this.authService.removeRefreshToken(req.user);

        res.setHeader('Set-Cookie', [
            'Authentication=; Path=/; SameSite=None; Max-Age=0; HttpOnly; Secure',
            'Refresh=; Path=/; SameSite=None; Max-Age=0; HttpOnly; Secure',
        ]);
    }
}