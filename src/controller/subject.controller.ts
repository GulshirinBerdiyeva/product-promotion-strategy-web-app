import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Types } from "mongoose";
import { SubjectService } from "../service/subject.service";
import { SubjectDto } from "../dto/request/subject.dto";
import { Subject } from "../model/subject.model";

@Controller('subjects')
export class SubjectController {

    constructor(private readonly subjectService: SubjectService) {}

    // @Post()
    // async create(@Body() subjectDto: SubjectDto): Promise<Subject> {
    //     return await this.subjectService.create(subjectDto);
    // }
    //
    // @Get()
    // async findAll(): Promise<Subject[]> {
    //     return this.subjectService.findAll();
    // }
    //
    //
    // @Delete(':id')
    // async delete(@Param('id') id: string) {
    //     return this.subjectService.delete(id);
    // }
}
