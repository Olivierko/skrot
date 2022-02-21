import { Post, Get, Controller, Query, Param, Patch, Delete, Body, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { Pagination } from '@/utility/pagination';
import { UserService } from '@/user/user.service';
import { UserEntity } from '@/user/user.entity';
import { UserDto } from '@/user/user.dto';

@Controller('users')
export class UserController {
    constructor(private readonly service: UserService) { }

    @Post()
    async create(@Body() dto: UserDto): Promise<UserEntity> {
        return await this.service.create(dto);
    }

    // @Get()
    // async index(
    //     @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    // ): Promise<Pagination<UserEntity>> {
    //     return await this.service.findAll(page, 25);
    // }

    // @Get(':id')
    // async findOne(@Param('id') id: string): Promise<UserEntity> {
    //     return await this.service.findOne(id);
    // }

    // @Patch(':id')
    // async update(@Param('id') id: string, @Body() dto: UserDto) {
    //     return await this.service.update(id, dto);
    // }

    // @Delete(':id')
    // async remove(@Param('id') id: string): Promise<void> {
    //     return await this.service.remove(id);
    // }
}