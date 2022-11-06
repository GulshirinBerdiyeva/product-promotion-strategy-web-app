import {Injectable, NotFoundException} from "@nestjs/common";
import {SubjectRepository} from "../repository/subject.repository";
import {Subject} from "../model/subject.model";
import {AppLogger} from "../aop/app.logger";

@Injectable()
export class SubjectUtil {
    constructor(private readonly subjectRepository: SubjectRepository,
                private readonly logger: AppLogger) {
    }

    async findById(subjectId: string): Promise<Subject> {
        return this.subjectRepository.findById(subjectId)
            .then(subject => {
                if (subject == undefined) {
                    throw new NotFoundException(`Subject with id=${subjectId} not found`);
                }
                return subject;
            })
    }

    async deleteById(subjectId: string) {
        await this.findById(subjectId);
        await this.subjectRepository.deleteById(subjectId);
    }
}
