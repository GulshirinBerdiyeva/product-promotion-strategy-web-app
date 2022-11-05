import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {Comment, CommentModel} from "../model/comment.model";
import {CommentService} from "../service/comment.service";
import {CommentController} from "../controller/comment.controller";
import {CommentRepository} from "../repository/comment.repository";
import {AppLogger} from "../aop/app.logger";
import {UserModule} from "./user.module";
import {PostModule} from "./post.module";
import {CommentUtil} from "../util/comment.util";

@Module({
    imports: [
        MongooseModule.forFeature([{name: Comment.name, schema: CommentModel}]),
        UserModule,
        PostModule
    ],
    controllers: [CommentController],
    providers: [CommentRepository, CommentService, CommentUtil, AppLogger],
    exports: [CommentRepository, CommentUtil]
})
export class CommentModule {
}