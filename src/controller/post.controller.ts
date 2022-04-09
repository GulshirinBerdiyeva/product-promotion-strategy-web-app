import {Body, Controller, Delete, Get, Param, Post, UploadedFiles, UseInterceptors} from '@nestjs/common';
import { PostService } from '../service/post.service';
import { PostDto } from '../dto/request/post.dto';
import {FilesInterceptor} from "@nestjs/platform-express";
import {SubjectDto} from "../dto/request/subject.dto";
import * as schema from "../model/post.model";

@Controller('posts')
export class PostController {

  constructor(private readonly postService: PostService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  async publishPost(@Body() postDto: PostDto, @Param() userId: string,
                    @Param() subjectId: string, @UploadedFiles() files) {
    await this.postService.publishPost(postDto, userId, subjectId);
  }

  @Get()
  async findAllProductsBySubjectTitle(@Param() subjectDto: SubjectDto): Promise<schema.Post[]> {
    return await this.postService.findAllPostsBySubjectTitleRegExp(subjectDto);
  }

  @Get(':userId')
  async findAll(@Param('userId') userId: string): Promise<schema.Post[]> {
    return await this.postService.findAllPostsByUserId(userId);
  }

  // @Get(':id')
  // async findOne(@Param('id') id: string): Promise<schema.Post> {
  //   return this.postService.findOneById(id);
  // }
  //
  // @Delete(':id')
  // async delete(@Param('id') id: string) {
  //   return this.postService.delete(id);
  // }
}
