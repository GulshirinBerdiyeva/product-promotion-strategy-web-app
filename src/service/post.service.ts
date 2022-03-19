import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from '../model/post.model';
import { PostDto } from '../dto/post.dto';

@Injectable()
export class PostService {

  constructor(@InjectModel(Post.name) private readonly postModel: Model<PostDocument>,) {}

  async create(postDto: PostDto): Promise<Post> {
    const post = new this.postModel(postDto);
    post.id = post._id;

    return post.save();
  }

  async findAll(): Promise<Post[]> {
    return this.postModel.find().exec();
  }

  async findOneById(id: string): Promise<Post> {
    return this.postModel.findOne({ _id: id }).exec();
  }

  async delete(id: string) {
    return await this.postModel.findOneAndRemove({ _id: id }).exec();
  }
}
