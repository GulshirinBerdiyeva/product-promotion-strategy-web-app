import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Comment, CommentDocument} from "../model/comment.model";

@Injectable()
export class CommentRepository {
    constructor(@InjectModel(Comment.name) private readonly commentModel: Model<CommentDocument>,) {
    }

    async save(comment: Comment): Promise<Comment> {
        const newComment = new this.commentModel(comment);
        newComment.id = newComment._id;
        return newComment.save();
    }

    async findAll(page: number, size: number): Promise<Comment[]> {
        return this.commentModel.find()
            .skip(page)
            .limit(size)
            .exec();
    }

    async findById(id: string): Promise<Comment> {
        return this.commentModel.findOne({_id: id}).exec();
    }

    async deleteById(id: string) {
        return await this.commentModel.findOneAndRemove({_id: id}).exec();
    }
}
