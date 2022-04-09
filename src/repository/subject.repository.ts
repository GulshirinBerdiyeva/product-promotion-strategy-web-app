import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Subject, SubjectDocument} from '../model/subject.model';
import {SubjectDto} from '../dto/request/subject.dto';

@Injectable()
export class SubjectRepository {

    constructor(@InjectModel(Subject.name) private readonly subjectModel: Model<SubjectDocument>,) {}

    async save(subjectDto: SubjectDto): Promise<Subject> {
        const subject = new this.subjectModel(subjectDto);
        subject.id = subject._id;
        return subject.save();
    }

    async findAll(): Promise<Subject[]> {
        return this.subjectModel.find().exec();
    }

    async findOneById(id: string): Promise<Subject> {
        return this.subjectModel.findOne({ _id: id }).exec();
    }

    async findAllByTitleRegExp(title: string): Promise<Subject[]> {
        return this.subjectModel.find({ title: new RegExp(title, 'i') }).exec();
    }

    async delete(id: string) {
        return await this.subjectModel.findOneAndRemove({ _id: id }).exec();
    }
}
