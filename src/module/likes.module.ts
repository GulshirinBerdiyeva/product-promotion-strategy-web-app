import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {Likes, LikesModel} from "../model/likes.model";
import {LikesService} from "../service/likes.service";
import {LikesController} from "../controller/likes.controller";
import {LikesRepository} from "../repository/likes.repository";
import {AppLogger} from "../aop/app.logger";

@Module ({
    imports: [MongooseModule.forFeature([{name: Likes.name, schema: LikesModel }])
    ],
    controllers: [LikesController],
    providers: [LikesRepository, LikesService, AppLogger],
    exports: [LikesRepository],
})
export class LikesModule{}