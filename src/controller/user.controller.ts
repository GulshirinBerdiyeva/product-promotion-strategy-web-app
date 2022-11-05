import {Body, Controller, Get, Param, Patch} from '@nestjs/common';
import {UserService} from '../service/user.service';
import {User} from '../model/user.model';
import {UserDto} from "../dto/request/user.dto";

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Patch(':id')
    async editUser(@Param('id') id: string, @Body() userDto: UserDto) {
        await this.userService.editUser(id, userDto);
    }

    @Get()
    async findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    // @Get(':id')
    // async findOne(@Param('id') id: string): Promise<User> {
    //   return this.userService.findOneById(id);
    // }
    //
    // @Delete(':id')
    // async delete(@Param('id') id: string) {
    //   return this.userService.delete(id);
    // }
}
