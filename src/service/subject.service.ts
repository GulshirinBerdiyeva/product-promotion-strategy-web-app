import {Injectable} from '@nestjs/common';
import {SubjectRepository} from "../repository/subject.repository";
import {InjectConnection} from "@nestjs/mongoose";
import mongoose from "mongoose";
import {SubjectDto} from "../dto/request/subject/subject.dto";
import {UserUtil} from "../util/user.util";
import {Subject} from "../model/subject.model";
import {SubjectUtil} from "../util/subject.util";

@Injectable()
export class SubjectService {
    constructor(@InjectConnection() private readonly connection: mongoose.Connection,
                private readonly subjectRepository: SubjectRepository,
                private readonly subjectUtil: SubjectUtil,
                private readonly userUtil: UserUtil,) {
    }

    async createSubject(userId: string, subjectDto: SubjectDto): Promise<Subject> {
        const transactionSession = await this.connection.startSession();
        transactionSession.startTransaction();

        await this.userUtil.findById(userId);
        let subject = this.subjectRepository.save(subjectDto);

        transactionSession.commitTransaction();
        return subject;
    }

    async findAll(page: number, size: number): Promise<Subject[]> {
        return await this.subjectRepository.findAll(page, size);
    }

    async findById(id: string): Promise<Subject> {
        return await this.subjectUtil.findById(id);
    }

    async deleteById(id: string) {
        await this.subjectUtil.deleteById(id);
    }
}
