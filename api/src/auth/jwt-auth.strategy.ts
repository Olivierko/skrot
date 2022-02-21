import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from '@/auth/auth.constants';
import { AuthService } from '@/auth/auth.service';
import { AuthModel } from '@/auth/auth.model';
import { Request } from 'express';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy, 'jwt-auth') {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                ExtractJwt.fromHeader('authorization'),
                (request: Request) => request?.cookies?.Authentication
            ]),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.accessTokenSecret,
        });
    }

    async validate(payload: any): Promise<AuthModel> {
        const user = await this.authService.validateExistance(payload.sub, payload.username);

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}