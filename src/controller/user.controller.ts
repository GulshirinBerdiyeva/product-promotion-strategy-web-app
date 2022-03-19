import { Controller, Delete, Get, Param } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { User } from '../model/user.model';
import { Types } from "mongoose";

@Controller('users')
export class UserController {

  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: Types.ObjectId): Promise<User> {
    return this.userService.findOneById(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: Types.ObjectId) {
    return this.userService.delete(id);
  }
}
