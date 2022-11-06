import {Injectable} from '@nestjs/common';
import {LikesRepository} from "../repository/likes.repository";
import {LikesDto} from "../dto/request/likes/likes.dto";
import {UserUtil} from "../util/user.util";
import {PostUtil} from "../util/post.util";
import {InjectConnection} from "@nestjs/mongoose";
import mongoose from "mongoose";
import {Likes} from 'src/model/likes.model';
import {LikesUtil} from "../util/likes.util";

@Injectable()
export class LikesService {
    constructor(@InjectConnection() private readonly connection: mongoose.Connection,
                private readonly likesRepository: LikesRepository,
                private readonly likesUtil: LikesUtil,
                private readonly userUtil: UserUtil,
                private readonly postUtil: PostUtil,) {
    }

    async createLike(userId: string, likesDto: LikesDto): Promise<Likes> {
        const transactionSession = await this.connection.startSession();
        transactionSession.startTransaction();

        let user = await this.userUtil.findById(userId);
        let post = await this.postUtil.findById(likesDto.postId.toString());

        let savedLike = await this.likesRepository.findByUserIdAndPostId(user.id, post.id)
            .then(async prevLike => {
                if (prevLike == undefined) {
                    let like = await this.likesUtil.createLike(user.id, likesDto);
                    return this.likesRepository.save(like);
                } else {
                    prevLike.liked = likesDto.liked;
                    return this.likesRepository.save(prevLike);
                }
            });

        transactionSession.commitTransaction();
        return savedLike;
    }

    async findAll(page: number, size: number): Promise<Likes[]> {
        return await this.likesRepository.findAll(page, size);
    }

    async findById(id: string): Promise<Likes> {
        return await this.likesUtil.findById(id);
    }

    async deleteById(id: string) {
        await this.likesUtil.deleteById(id);
    }
}
