import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from '../models/post.schema';
import { PostDto } from '../dto/post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<PostDocument>,
  ) {}

  async create(postDto: PostDto): Promise<Post> {
    return await this.postModel.create(postDto);
  }

  async findAll(): Promise<Post[]> {
    return this.postModel.find().exec();
  }

  async findOne(id: string): Promise<Post> {
    return this.postModel.findOne({ _id: id }).exec();
  }

  async delete(id: string) {
    return await this.postModel.findOneAndRemove({ _id: id }).exec();
  }
}
