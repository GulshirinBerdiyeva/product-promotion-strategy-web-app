import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {Likes, LikesModel} from "../model/likes.model";
import {LikesService} from "../service/likes.service";
import {LikesController} from "../controller/likes.controller";
import {LikesRepository} from "../repository/likes.repository";
import {AppLogger} from "../aop/app.logger";
import {UserModule} from "./user.module";
import {PostModule} from "./post.module";

@Module({
    imports: [MongooseModule.forFeature([{name: Likes.name, schema: LikesModel}]),
        UserModule,
        PostModule
    ],
    controllers: [LikesController],
    providers: [LikesRepository, LikesService, AppLogger],
    exports: [LikesRepository],
})
export class LikesModule {
}