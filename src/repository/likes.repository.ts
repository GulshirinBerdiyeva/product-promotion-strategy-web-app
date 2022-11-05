import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Likes, LikesDocument} from "../model/likes.model";
import {LikesDto} from "../dto/request/likes.dto";

@Injectable()
export class LikesRepository {
    constructor(@InjectModel(Likes.name) private readonly likesModel: Model<LikesDocument>,) {
    }

    async save(likesDto: LikesDto): Promise<Likes> {
        const like = new this.likesModel(likesDto);
        like.id = like._id;
        return like.save();
    }

    async findAll(): Promise<Likes[]> {
        return this.likesModel.find().exec();
    }

    async findOneById(id: string): Promise<Likes> {
        return this.likesModel.findOne({_id: id}).exec();
    }

    async delete(id: string) {
        return await this.likesModel.findOneAndRemove({_id: id}).exec();
    }
}
