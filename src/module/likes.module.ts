import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Likes, LikesModel } from "../model/likes.model";
import { LikesService } from "../service/likes.service";
import { LikesController } from "../controller/likes.controller";

@Module ({
    imports: [MongooseModule.forFeature([{name: Likes.name, schema: LikesModel }])
    ],
    controllers: [LikesController],
    providers: [LikesService],
})
export class LikesModule{}