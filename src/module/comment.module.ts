import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {Comment, CommentModel} from "../model/comment.model";
import {CommentService} from "../service/comment.service";
import {CommentController} from "../controller/comment.controller";
import {CommentRepository} from "../repository/comment.repository";
import {AppLogger} from "../aop/app.logger";

@Module ({
    imports: [
        MongooseModule.forFeature([{name: Comment.name, schema: CommentModel}])
    ],
    controllers: [CommentController],
    providers: [CommentRepository, CommentService, AppLogger],
    exports: [CommentRepository]
})
export class CommentModule{}