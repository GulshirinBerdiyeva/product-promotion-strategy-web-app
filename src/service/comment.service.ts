import {Injectable} from '@nestjs/common';
import {CommentRepository} from "../repository/comment.repository";
import {InjectConnection} from "@nestjs/mongoose";
import mongoose from "mongoose";
import {CommentDto} from "../dto/request/comment.dto";
import {UserUtil} from "../util/user.util";
import {PostUtil} from "../util/post.util";
import {CommentReplyDto} from "../dto/request/comment.reply.dto";
import {CommentUtil} from "../util/comment.util";

@Injectable()
export class CommentService {

    constructor(@InjectConnection() private readonly connection: mongoose.Connection,
                private readonly commentRepository: CommentRepository,
                private readonly commentUtil: CommentUtil,
                private readonly userUtil: UserUtil,
                private readonly postUtil: PostUtil,) {}

    async createComment(commentDto: CommentDto) {
        const transactionSession = await this.connection.startSession();
        transactionSession.startTransaction();

        this.userUtil.getUserById(commentDto.userId.toString()).then((user) => {
            this.postUtil.getPostById(commentDto.postId.toString()).then((post) => {

                this.commentRepository.save(commentDto);
                transactionSession.commitTransaction();
            });
        });
    }

    async replyOnComment(commentReplyDto: CommentReplyDto) {
        const transactionSession = await this.connection.startSession();
        transactionSession.startTransaction();

        this.userUtil.getUserById(commentReplyDto.repliedAuthorId.toString()).then((repliedAuthor) => {
            this.userUtil.getUserById(commentReplyDto.authorId.toString()).then((author) => {
                this.postUtil.getPostById(commentReplyDto.postId.toString()).then((post) => {
                    this.commentUtil.getCommentById(commentReplyDto.commentId.toString()).then((comment) => {

                        this.commentUtil.fillComment(commentReplyDto).then((comment) => {
                            this.commentRepository.save(comment);
                            transactionSession.commitTransaction();
                        });
                    });
                });
            });
        });
    }
}
