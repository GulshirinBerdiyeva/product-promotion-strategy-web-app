import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {Subject, SubjectModel} from "../model/subject.model";
import {SubjectService} from "../service/subject.service";
import {SubjectController} from "../controller/subject.controller";
import {SubjectRepository} from "../repository/subject.repository";
import {AppLogger} from "../aop/app.logger";
import {SubjectUtil} from "../util/subject.util";
import {UserModule} from "./user.module";

@Module({
    imports: [
        MongooseModule.forFeature([{name: Subject.name, schema: SubjectModel}]),
        UserModule
    ],
    controllers: [SubjectController],
    providers: [SubjectRepository, SubjectService, SubjectUtil, AppLogger],
    exports: [SubjectRepository, SubjectUtil],
})
export class SubjectModule {
}