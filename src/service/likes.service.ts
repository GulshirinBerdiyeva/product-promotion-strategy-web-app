import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Likes, LikesDocument } from "../model/likes.model";
import { LikesDto } from "../dto/likes.dto";

@Injectable()
export class LikesService {

    constructor(@InjectModel(Likes.name) private readonly likesModel: Model<LikesDocument>,) {}

    async create(likesDto: LikesDto): Promise<Likes> {
        const like = new this.likesModel(likesDto);
        like.id = like._id;

        return like.save();
    }

    async findAll(): Promise<Likes[]> {
        return this.likesModel.find().exec();
    }

    async findOneById(id: Types.ObjectId): Promise<Likes> {
        return this.likesModel.findOne({ _id: id }).exec();
    }

    async delete(id: Types.ObjectId) {
        return await this.likesModel.findOneAndRemove({ _id: id }).exec();
    }
}
