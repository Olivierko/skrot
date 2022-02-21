import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '@/user/user.service';
import { UserController } from '@/user/user.controller';
import { UserEntity } from '@/user/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    providers: [UserService],
    controllers: [UserController],
    exports: [UserService],
})
export class UserModule { }