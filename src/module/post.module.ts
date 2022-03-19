import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostModel } from '../model/post.model';
import { PostController } from '../controller/post.controller';
import { PostService } from '../service/post.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostModel }]),
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
