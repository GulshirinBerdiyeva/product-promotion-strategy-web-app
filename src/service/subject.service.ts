import {Injectable} from '@nestjs/common';
import {SubjectRepository} from "../repository/subject.repository";
import {InjectConnection} from "@nestjs/mongoose";
import mongoose from "mongoose";
import {SubjectDto} from "../dto/request/subject.dto";
import {UserUtil} from "../util/user.util";

@Injectable()
export class SubjectService {
    constructor(@InjectConnection() private readonly connection: mongoose.Connection,
                private readonly subjectRepository: SubjectRepository,
                private readonly userUtil: UserUtil,) {
    }

    async createSubject(subjectDto: SubjectDto) {
        const transactionSession = await this.connection.startSession();
        transactionSession.startTransaction();

        this.userUtil.getUserById(subjectDto.userId.toString()).then(() => {
            this.subjectRepository.save(subjectDto);
            transactionSession.commitTransaction();
        });
    }
}
