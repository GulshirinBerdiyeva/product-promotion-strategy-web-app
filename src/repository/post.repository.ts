import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Post, PostDocument} from '../model/post.model';

@Injectable()
export class PostRepository {
    constructor(@InjectModel(Post.name) private readonly postModel: Model<PostDocument>,) {
    }

    async save(post: Post): Promise<Post> {
        const newPost = new this.postModel(post);
        newPost.id = newPost._id;
        return newPost.save();
    }

    async findAll(page: number, size: number): Promise<Post[]> {
        return this.postModel.find()
            .skip(page)
            .limit(size)
            .exec();
    }

    async findById(id: string): Promise<Post> {
        return this.postModel.findOne({_id: id}).exec();
    }

    async findAllBySubjectId(subjectId: string, page: number, size: number): Promise<Post[]> {
        return this.postModel.find({subjectId: subjectId})
            .skip(page)
            .limit(size)
            .exec();
    }

    async findAllByUserId(userId: string, page: number, size: number): Promise<Post[]> {
        return this.postModel.find({userId: userId})
            .skip(page)
            .limit(size)
            .exec();
    }

    async deleteById(id: string) {
        return await this.postModel.findOneAndRemove({_id: id}).exec();
    }
}
