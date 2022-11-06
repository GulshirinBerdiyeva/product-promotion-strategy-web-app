import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Query} from '@nestjs/common';
import {LikesService} from "../service/likes.service";
import {LikesDto} from "../dto/request/likes/likes.dto";
import {Likes} from "../model/likes.model";
import {GetCurrentUserId} from "../decorator/getCurrentUserId.decorator";
import {PagingDto} from "../dto/request/paging.dto";

@Controller('api/v1/likes')
export class LikesController {
    constructor(private readonly likesService: LikesService) {
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createLike(@GetCurrentUserId() userId: string,
                     @Body() likesDto: LikesDto): Promise<Likes> {
        return await this.likesService.createLike(userId, likesDto);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(@Query() pagingDto: PagingDto): Promise<Likes[]> {
        return await this.likesService.findAll(pagingDto.page, pagingDto.size);
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    async findOne(@Param('id') id: string): Promise<Likes> {
        return this.likesService.findById(id);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.OK)
    async delete(@Param('id') id: string) {
        return this.likesService.deleteById(id);
    }
}
