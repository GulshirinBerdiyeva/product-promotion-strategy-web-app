import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model, Types} from 'mongoose';
import {Likes, LikesDocument} from "../model/likes.model";

@Injectable()
export class LikesRepository {
    constructor(@InjectModel(Likes.name) private readonly likesModel: Model<LikesDocument>,) {
    }

    async save(like: Likes): Promise<Likes> {
        const newLike = new this.likesModel(like);
        newLike.id = newLike._id;
        return newLike.save();
    }

    async findAll(page: number, size: number): Promise<Likes[]> {
        return this.likesModel.find()
            .skip(page)
            .limit(size)
            .exec();
    }

    async findByUserIdAndPostId(userId: Types.ObjectId, postId: Types.ObjectId): Promise<Likes> {
        return this.likesModel
            .findOne({
                userId: userId,
                postId: postId
            })
            .exec();
    }

    async findById(id: string): Promise<Likes> {
        return this.likesModel.findOne({_id: id}).exec();
    }

    async deleteById(id: string) {
        return await this.likesModel.findOneAndRemove({_id: id}).exec();
    }
}
