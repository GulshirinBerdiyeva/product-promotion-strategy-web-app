import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PostService } from '../service/post.service';
import { PostDto } from '../dto/post.dto';
import * as schema from '../model/post.model';

@Controller('posts')
export class PostController {

  constructor(private readonly postService: PostService) {}

  @Post()
  async create(@Body() postDto: PostDto): Promise<schema.Post> {
    return await this.postService.create(postDto);
  }

  @Get()
  async findAll(): Promise<schema.Post[]> {
    return this.postService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<schema.Post> {
    return this.postService.findOneById(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.postService.delete(id);
  }
}
