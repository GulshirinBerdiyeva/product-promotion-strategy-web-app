import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {Post, PostModel} from '../model/post.model';
import {PostController} from '../controller/post.controller';
import {PostService} from '../service/post.service';
import {MulterModule} from "@nestjs/platform-express";
import {MulterPostConfig} from "../config/multer.post.config";
import {AppLogger} from "../aop/app.logger";
import {UserModule} from "./user.module";
import {SubjectModule} from "./subject.module";
import {PostRepository} from "../repository/post.repository";
import {PostUtil} from "../util/post.util";

@Module({
    imports: [
        MongooseModule.forFeature([{name: Post.name, schema: PostModel}]),
        MulterModule.registerAsync({
            useClass: MulterPostConfig,
        }),
        UserModule,
        SubjectModule,
    ],
    controllers: [PostController],
    providers: [PostRepository, PostService, PostUtil, AppLogger],
    exports: [PostRepository, PostUtil],
})
export class PostModule {
}
