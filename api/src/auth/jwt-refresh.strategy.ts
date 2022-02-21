import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from '@/auth/auth.constants';
import { AuthService } from '@/auth/auth.service';
import { AuthModel } from '@/auth/auth.model';
import { Request } from 'express';

const cookieExtractor = (request: Request) => request?.cookies?.Refresh;

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                ExtractJwt.fromHeader('authorization-refresh'),
                cookieExtractor
            ]),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.refreshTokenSecret,
            passReqToCallback: true,
        });
    }

    async validate(request: Request, payload: any): Promise<AuthModel> {
        const token = request.headers['authorization-refresh'] ?? cookieExtractor(request);
        const user = await this.authService.validateUsingRefreshToken(payload.username, token);

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}