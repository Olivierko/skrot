import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@/user/user.service';
import { AuthModel } from '@/auth/auth.model';
import { AuthToken } from '@/auth/auth.token';
import { jwtConstants } from '@/auth/auth.constants';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    async validateExistance(id: string, username: string): Promise<AuthModel> {
        const user = await this.userService.findOne(username);

        if (user) {
            const { password, refreshToken, ...model } = user;
            return model;
        }

        return null;
    }

    async validateUsingPassword(username: string, password: string): Promise<AuthModel> {
        const user = await this.userService.findOne(username);
        const isMatch = user && await bcrypt.compare(password, user.password);

        if (isMatch) {
            const { password, refreshToken, ...model } = user;
            return model;
        }

        return null;
    }

    async validateUsingRefreshToken(username: string, token: string): Promise<AuthModel> {
        const user = await this.userService.findOne(username);

        const isMatch = user && user.refreshToken && await bcrypt.compare(token, user.refreshToken);

        if (isMatch) {
            const { password, refreshToken, ...model } = user;
            return model;
        }

        return null;
    }

    async generateRefreshToken(user: AuthModel): Promise<AuthToken> {
        const match = await this.userService.findOne(user.username);

        if (!match) {
            return null;
        }

        const payload = {
            sub: match.id,
            username: match.username,
        };

        const token = this.jwtService.sign(payload, {
            secret: jwtConstants.refreshTokenSecret,
            expiresIn: `${jwtConstants.refreshTokenExpiration}s`,
        });

        await this.userService.setRefreshToken(match.id, token);

        return {
            token: token,
            maxAge: jwtConstants.refreshTokenExpiration,
            expiry: new Date(+new Date() + 60 * jwtConstants.refreshTokenExpiration)
        };
    }

    async removeRefreshToken(user: AuthModel): Promise<void> {
        const match = await this.userService.findOne(user.username);

        if (!match) {
            return;
        }

        await this.userService.setRefreshToken(match.id, null);
    }

    async generateAccessToken(user: AuthModel): Promise<AuthToken> {
        const match = await this.userService.findOne(user.username);

        const payload = {
            sub: match.id,
            username: match.username,
        };

        const token = this.jwtService.sign(payload, {
            secret: jwtConstants.accessTokenSecret,
            expiresIn: `${jwtConstants.accessTokenExpiration}s`,
        });

        return {
            token: token,
            maxAge: jwtConstants.accessTokenExpiration,
            expiry: new Date(+new Date() + 60 * jwtConstants.accessTokenExpiration)
        };
    }
}