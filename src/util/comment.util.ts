import {Injectable, NotFoundException} from "@nestjs/common";
import {AppLogger} from "../aop/app.logger";
import {CommentRepository} from "../repository/comment.repository";
import {Comment} from "../model/comment.model";
import {CommentReplyDto} from "../dto/request/comment.reply.dto";

@Injectable()
export class CommentUtil {

    constructor(private readonly commentRepository: CommentRepository,
                private readonly logger: AppLogger) {}

    async getCommentById(commentId: string): Promise<Comment> {
        return this.commentRepository.findOneById(commentId)
            .catch((err) => {
                this.logger.error(`comment with id=${commentId} not found`, err);
                throw new NotFoundException(`comment with id=${commentId} not found`);
            });
    }

    async fillComment(commentReplyDto: CommentReplyDto): Promise<Comment> {
        const comment = new Comment();
        comment.comment = commentReplyDto.comment;
        comment.postId = commentReplyDto.postId;
        comment.userId = commentReplyDto.repliedAuthorId;
        comment.date = commentReplyDto.date;
        comment.isPositive = commentReplyDto.isPositive;
        return comment;
    }
 }
