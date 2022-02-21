import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '@/auth/auth.service';
import { AuthModel } from '@/auth/auth.model';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private service: AuthService) {
        super();
    }

    async validate(username: string, password: string): Promise<AuthModel> {
        const user = await this.service.validateUsingPassword(username, password);

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}