import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Comment, CommentModel } from "../model/comment.model";
import { CommentService } from "../service/comment.service";
import { CommentController } from "../controller/comment.controller";

@Module ({
    imports: [
        MongooseModule.forFeature([{name: Comment.name, schema: CommentModel}])
    ],
    controllers: [CommentController],
    providers: [CommentService],
})
export class CommentModule{}