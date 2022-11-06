import {Injectable, NotFoundException} from "@nestjs/common";
import {AppLogger} from "../aop/app.logger";
import {Types} from "mongoose";
import {LikesRepository} from "../repository/likes.repository";
import {LikesDto} from "../dto/request/likes/likes.dto";
import {Likes} from "../model/likes.model";

@Injectable()
export class LikesUtil {
    constructor(private readonly likesRepository: LikesRepository,
                private readonly logger: AppLogger) {
    }

    async createLike(userId: Types.ObjectId, likesDto: LikesDto): Promise<Likes> {
        const like = new Likes();
        like.liked = likesDto.liked;
        like.userId = userId;
        like.postId = likesDto.postId;
        return like;
    }

    async findById(likesId: string): Promise<Likes> {
        return this.likesRepository.findById(likesId)
            .then(like => {
                if (like == undefined) {
                    throw new NotFoundException(`Like with id=${likesId} not found`);
                }
                return like;
            })
    }

    async deleteById(likesId: string) {
        await this.findById(likesId);
        await this.likesRepository.deleteById(likesId);
    }
}
