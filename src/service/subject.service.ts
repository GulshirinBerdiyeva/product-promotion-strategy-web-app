import {Injectable} from '@nestjs/common';
import {SubjectRepository} from "../repository/subject.repository";
import {InjectConnection} from "@nestjs/mongoose";
import mongoose from "mongoose";

@Injectable()
export class SubjectService {

    constructor(@InjectConnection() private readonly connection: mongoose.Connection,
                private readonly subjectRepository: SubjectRepository,) {}
}
