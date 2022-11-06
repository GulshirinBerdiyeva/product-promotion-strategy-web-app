import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Query} from '@nestjs/common';
import {CommentService} from "../service/comment.service";
import {CommentDto} from "../dto/request/comment/comment.dto";
import {GetCurrentUserId} from "../decorator/getCurrentUserId.decorator";
import {Comment} from "../model/comment.model";
import {PagingDto} from "../dto/request/paging.dto";

@Controller('api/v1/comments')
export class CommentController {
    constructor(private readonly commentService: CommentService) {
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createComment(@GetCurrentUserId() userId: string,
                        @Body() commentDto: CommentDto): Promise<Comment> {
        return await this.commentService.createComment(userId, commentDto);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(@Query() pagingDto: PagingDto): Promise<Comment[]> {
        return this.commentService.findAll(pagingDto.page, pagingDto.size);
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    async findOne(@Param('id') id: string): Promise<Comment> {
        return this.commentService.findById(id);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.OK)
    async delete(@Param('id') id: string) {
        return this.commentService.deleteById(id);
    }
}
