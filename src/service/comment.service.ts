import {Injectable} from '@nestjs/common';
import {CommentRepository} from "../repository/comment.repository";
import {InjectConnection} from "@nestjs/mongoose";
import mongoose from "mongoose";
import {CommentDto} from "../dto/request/comment/comment.dto";
import {UserUtil} from "../util/user.util";
import {PostUtil} from "../util/post.util";
import {CommentUtil} from "../util/comment.util";
import {Comment} from "../model/comment.model";

@Injectable()
export class CommentService {
    constructor(@InjectConnection() private readonly connection: mongoose.Connection,
                private readonly commentRepository: CommentRepository,
                private readonly commentUtil: CommentUtil,
                private readonly userUtil: UserUtil,
                private readonly postUtil: PostUtil,) {
    }

    async createComment(userId: string, commentDto: CommentDto): Promise<Comment> {
        const transactionSession = await this.connection.startSession();
        transactionSession.startTransaction();

        let user = await this.userUtil.findById(userId);
        let post = await this.postUtil.findById(commentDto.postId.toString());

        let comment = await this.commentUtil.createComment(user.id, commentDto);
        let newComment = await this.commentRepository.save(comment);
        transactionSession.commitTransaction();

        return newComment;
    }

    async findAll(page: number, size: number): Promise<Comment[]> {
        return await this.commentRepository.findAll(page, size);
    }

    async findById(id: string): Promise<Comment> {
        return await this.commentUtil.findById(id);
    }

    async deleteById(id: string) {
        await this.commentUtil.deleteById(id);
    }
}
