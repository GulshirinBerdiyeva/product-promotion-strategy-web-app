import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Subject, SubjectDocument} from '../model/subject.model';
import {SubjectDto} from '../dto/request/subject/subject.dto';

@Injectable()
export class SubjectRepository {
    constructor(@InjectModel(Subject.name) private readonly subjectModel: Model<SubjectDocument>,) {
    }

    async save(subjectDto: SubjectDto): Promise<Subject> {
        const subject = new this.subjectModel(subjectDto);
        subject.id = subject._id;
        return subject.save();
    }

    async findAll(page: number, size: number): Promise<Subject[]> {
        return this.subjectModel.find()
            .skip(page)
            .limit(size)
            .exec();
    }

    async findAllByTitleRegExp(title: string, page: number, size: number): Promise<Subject[]> {
        const regExp = new RegExp(title, 'i');
        return this.subjectModel.find({title: {$regex: regExp}})
            .skip(page)
            .limit(size)
            .exec();
    }

    async findById(id: string): Promise<Subject> {
        return this.subjectModel.findOne({_id: id}).exec();
    }

    async deleteById(id: string) {
        await this.subjectModel.findOneAndRemove({_id: id}).exec();
    }
}
