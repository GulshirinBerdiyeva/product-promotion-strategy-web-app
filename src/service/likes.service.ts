import {Injectable} from '@nestjs/common';
import {LikesRepository} from "../repository/likes.repository";
import {LikesDto} from "../dto/request/likes.dto";
import {UserUtil} from "../util/user.util";
import {PostUtil} from "../util/post.util";
import {InjectConnection} from "@nestjs/mongoose";
import mongoose from "mongoose";

@Injectable()
export class LikesService {
    constructor(@InjectConnection() private readonly connection: mongoose.Connection,
                private readonly likesRepository: LikesRepository,
                private readonly userUtil: UserUtil,
                private readonly postUtil: PostUtil,) {
    }

    async createLike(likesDto: LikesDto) {
        const transactionSession = await this.connection.startSession();
        transactionSession.startTransaction();

        this.userUtil.getUserById(likesDto.userId.toString()).then((user) => {
            this.postUtil.getPostById(likesDto.postId.toString()).then((post) => {

                this.likesRepository.save(likesDto);
                transactionSession.commitTransaction();
            });
        });
    }
}
