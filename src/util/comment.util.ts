import {Injectable, NotFoundException} from "@nestjs/common";
import {AppLogger} from "../aop/app.logger";
import {CommentRepository} from "../repository/comment.repository";
import {Comment} from "../model/comment.model";
import {CommentDto} from "../dto/request/comment/comment.dto";
import {Types} from "mongoose";

@Injectable()
export class CommentUtil {
    constructor(private readonly commentRepository: CommentRepository,
                private readonly logger: AppLogger) {
    }

    async createComment(userId: Types.ObjectId, commentDto: CommentDto): Promise<Comment> {
        const comment = new Comment();
        comment.comment = commentDto.comment;
        comment.userId = userId;
        comment.postId = commentDto.postId;
        return comment;
    }

    async findById(commentId: string): Promise<Comment> {
        return this.commentRepository.findById(commentId)
            .then(comment => {
                if (comment == undefined) {
                    throw new NotFoundException(`Comment with id=${commentId} not found`);
                }
                return comment;
            })
    }

    async deleteById(postId: string) {
        await this.findById(postId);
        await this.commentRepository.deleteById(postId);
    }
}
