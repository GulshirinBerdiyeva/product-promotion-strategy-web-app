import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Query} from '@nestjs/common';
import {SubjectService} from "../service/subject.service";
import {SubjectDto} from "../dto/request/subject/subject.dto";
import {GetCurrentUserId} from "../decorator/getCurrentUserId.decorator";
import {Subject} from "../model/subject.model";
import {User} from "../model/user.model";
import {PagingDto} from "../dto/request/paging.dto";

@Controller('api/v1/subjects')
export class SubjectController {
    constructor(private readonly subjectService: SubjectService) {
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@GetCurrentUserId() userId: string,
                 @Body() subjectDto: SubjectDto): Promise<Subject> {
        return await this.subjectService.createSubject(userId, subjectDto);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(@Query() pagingDto: PagingDto): Promise<Subject[]> {
        return this.subjectService.findAll(pagingDto.page, pagingDto.size);
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    async findById(@Param('id') id: string): Promise<Subject> {
        return this.subjectService.findById(id);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.OK)
    async delete(@Param('id') id: string) {
        await this.subjectService.deleteById(id);
    }
}
