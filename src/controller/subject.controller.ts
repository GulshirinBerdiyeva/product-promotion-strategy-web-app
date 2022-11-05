import {Body, Controller, Post} from '@nestjs/common';
import {SubjectService} from "../service/subject.service";
import {SubjectDto} from "../dto/request/subject.dto";

@Controller('subjects')
export class SubjectController {
    constructor(private readonly subjectService: SubjectService) {
    }

    @Post()
    async create(@Body() subjectDto: SubjectDto) {
        await this.subjectService.createSubject(subjectDto);
    }

    // @Get()
    // async findAll(): Promise<Subject[]> {
    //     return this.subjectService.findAll();
    // }
    //
    // @Delete(':id')
    // async delete(@Param('id') id: string) {
    //     return this.subjectService.delete(id);
    // }
}
