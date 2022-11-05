import {Injectable, NotFoundException} from "@nestjs/common";
import {AppLogger} from "../aop/app.logger";
import {SubjectRepository} from "../repository/subject.repository";
import {Subject} from "../model/subject.model";

@Injectable()
export class SubjectUtil {
    constructor(private readonly subjectRepository: SubjectRepository,
                private readonly logger: AppLogger) {
    }

    async getSubjectById(subjectId: string): Promise<Subject> {
        return this.subjectRepository.findOneById(subjectId)
            .catch((err) => {
                this.logger.error(`subject with id=${subjectId} not found`, err);
                throw new NotFoundException(`subject with id=${subjectId} not found`);
            });
    }
}
