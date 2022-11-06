import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Query} from '@nestjs/common';
import {UserService} from '../service/user.service';
import {User} from '../model/user.model';
import {UserDto} from "../dto/request/user/user.dto";
import {GetCurrentUserId} from "../decorator/getCurrentUserId.decorator";
import {PagingDto} from "../dto/request/paging.dto";

@Controller('api/v1/users')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Patch()
    @HttpCode(HttpStatus.OK)
    async editById(@GetCurrentUserId() userId: string,
                   @Body() userDto: UserDto): Promise<User> {
        return await this.userService.editById(userId, userDto);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(@Query() pagingDto: PagingDto): Promise<User[]> {
        return this.userService.findAll(pagingDto.page, pagingDto.size);
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    async findById(@Param('id') id: string): Promise<User> {
      return this.userService.findById(id);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.OK)
    async deleteById(@Param('id') id: string) {
      await this.userService.deleteById(id);
    }
}
