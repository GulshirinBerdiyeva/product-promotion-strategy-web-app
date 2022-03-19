import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { LikesService } from "../service/likes.service";
import { Likes } from "../model/likes.model";
import { LikesDto } from "../dto/likes.dto";
import { Types } from "mongoose";

@Controller('likes')
export class LikesController {

    constructor(private readonly likesService: LikesService) {}

    @Post()
    async create(@Body() likesDto: LikesDto): Promise<Likes> {
        return await this.likesService.create(likesDto);
    }

    @Get()
    async findAll(): Promise<Likes[]> {
        return this.likesService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: Types.ObjectId): Promise<Likes> {
        return this.likesService.findOneById(id);
    }

    @Delete(':id')
    async delete(@Param('id') id: Types.ObjectId) {
        return this.likesService.delete(id);
    }
}
