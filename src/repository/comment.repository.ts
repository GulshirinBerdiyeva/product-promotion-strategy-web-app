import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Comment, CommentDocument} from "../model/comment.model";
import {CommentDto} from "../dto/request/comment.dto";

@Injectable()
export class CommentRepository {

    constructor(@InjectModel(Comment.name) private readonly commentModel: Model<CommentDocument>,) {}

    async save(commentDto: CommentDto): Promise<Comment> {
        const comment = new this.commentModel(commentDto);
        comment.id = comment._id;
        return comment.save();
    }

    async findAll(): Promise<Comment[]> {
        return this.commentModel.find().exec();
    }

    async findOneById(id: string): Promise<Comment> {
        return this.commentModel.findOne({ _id: id }).exec();
    }

    async delete(id: string) {
        return await this.commentModel.findOneAndRemove({ _id: id }).exec();
    }
}
