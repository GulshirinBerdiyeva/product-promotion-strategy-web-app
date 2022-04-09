import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {CommentService} from "../service/comment.service";
import {CommentDto} from "../dto/request/comment.dto";
import {Comment} from "../model/comment.model";
import {CommentReplyDto} from "../dto/request/comment.reply.dto";

@Controller('comments')
export class CommentController {

    constructor(private readonly commentService: CommentService) {}

    @Post()
    async createComment(@Body() commentDto: CommentDto) {
        await this.commentService.createComment(commentDto);
    }

    @Post()
    async replyOnComment(@Body() commentReplyDto: CommentReplyDto) {
        await this.commentService.replyOnComment(commentReplyDto);
    }

    // @Get()
    // async findAll(): Promise<Comment[]> {
    //     return this.commentService.findAll();
    // }
    //
    // @Get(':id')
    // async findOne(@Param('id') id: string): Promise<Comment> {
    //     return this.commentService.findOneById(id);
    // }
    //
    // @Delete(':id')
    // async delete(@Param('id') id: string) {
    //     return this.commentService.delete(id);
    // }
}
