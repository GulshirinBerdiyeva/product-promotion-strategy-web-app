import {
    Body,
    Controller, Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Query,
    UploadedFiles,
    UseInterceptors
} from '@nestjs/common';
import {PostService} from '../service/post.service';
import {FilesInterceptor} from "@nestjs/platform-express";
import {SubjectDto} from "../dto/request/subject/subject.dto";
import * as schema from "../model/post.model";
import {GetCurrentUserId} from "../decorator/getCurrentUserId.decorator";
import {PostUtil} from "../util/post.util";
import {PagingDto} from "../dto/request/paging.dto";

@Controller('api/v1/posts')
export class PostController {
    constructor(private readonly postService: PostService,
                private readonly postUtil: PostUtil) {
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UseInterceptors(FilesInterceptor('files'))
    async publishPost(@GetCurrentUserId() userId: string,
                      @Body() body,
                      @UploadedFiles() files): Promise<schema.Post> {
        console.log(files);
        const postDto = await this.postUtil.createPostDto(body.description, body.subjectId);
        return await this.postService.publishPost(userId, postDto, files);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async findAllBySubjectTitle(@Body() subjectDto: SubjectDto,
                                @Query() pagingDto: PagingDto): Promise<schema.Post[]> {
        return await this.postService.findAllBySubjectTitleRegExp(subjectDto, pagingDto.page, pagingDto.size);
    }

    @Get('/users/:userId')
    @HttpCode(HttpStatus.OK)
    async findAllByUserId(@Param('userId') userId: string,
                          @Query() pagingDto: PagingDto): Promise<schema.Post[]> {
        return await this.postService.findAllPostsByUserId(userId, pagingDto.page, pagingDto.size);
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    async findById(@Param('id') id: string): Promise<schema.Post> {
        return this.postService.findById(id);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.OK)
    async delete(@Param('id') id: string) {
        await this.postService.deleteById(id);
    }
}
