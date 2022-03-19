import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Subject, SubjectModel } from "../model/subject.model";
import { SubjectService } from "../service/subject.service";
import { SubjectController } from "../controller/subject.controller";

@Module ({
    imports: [MongooseModule.forFeature([{name: Subject.name, schema: SubjectModel }])
    ],
    controllers: [SubjectController],
    providers: [SubjectService],
})
export class SubjectModule{}