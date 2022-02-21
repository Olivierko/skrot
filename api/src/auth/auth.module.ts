import { Module } from '@nestjs/common';
import { AuthService } from '@/auth/auth.service';
import { AuthController } from '@/auth/auth.controller';
import { UserModule } from '@/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '@/auth/local.strategy';
import { JwtAuthStrategy } from '@/auth/jwt-auth.strategy';
import { JwtRefreshStrategy } from '@/auth/jwt-refresh.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.register({}),
    ],
    providers: [AuthService, LocalStrategy, JwtAuthStrategy, JwtRefreshStrategy],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule { }