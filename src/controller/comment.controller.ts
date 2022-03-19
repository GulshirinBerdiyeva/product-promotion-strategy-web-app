import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Types } from "mongoose";
import { CommentService } from "../service/comment.service";
import { CommentDto } from "../dto/comment.dto";
import { Comment } from "../model/comment.model";

@Controller('comments')
export class CommentController {

    constructor(private readonly commentService: CommentService) {}

    @Post()
    async create(@Body() commentDto: CommentDto): Promise<Comment> {
        return await this.commentService.create(commentDto);
    }

    @Get()
    async findAll(): Promise<Comment[]> {
        return this.commentService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: Types.ObjectId): Promise<Comment> {
        return this.commentService.findOneById(id);
    }

    @Delete(':id')
    async delete(@Param('id') id: Types.ObjectId) {
        return this.commentService.delete(id);
    }
}
