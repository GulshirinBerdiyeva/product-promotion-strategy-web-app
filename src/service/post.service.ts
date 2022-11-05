import {Injectable, NotFoundException} from '@nestjs/common';
import {PostDto} from '../dto/request/post.dto';
import {UserUtil} from "../util/user.util";
import {SubjectUtil} from "../util/subject.util";
import {PostRepository} from "../repository/post.repository";
import {InjectConnection} from "@nestjs/mongoose";
import mongoose from "mongoose";
import {SubjectDto} from "../dto/request/subject.dto";
import {SubjectRepository} from "../repository/subject.repository";
import {Post} from "../model/post.model";

@Injectable()
export class PostService {
    constructor(@InjectConnection() private readonly connection: mongoose.Connection,
                private readonly userUtil: UserUtil,
                private readonly subjectUtil: SubjectUtil,
                private readonly postRepository: PostRepository,
                private readonly subjectRepository: SubjectRepository,) {
    }

    async publishPost(postDto: PostDto, userId: string, subjectId: string) {
        const transactionSession = await this.connection.startSession();
        transactionSession.startTransaction();

        await this.userUtil.getUserById(userId).then((user) => {
            this.subjectUtil.getSubjectById(subjectId).then((subject) => {
                postDto.userId = user.id;
                postDto.subjectId = subject.id;

                this.postRepository.save(postDto);
                transactionSession.commitTransaction();
            });
        });
    }

    async findAllPostsBySubjectTitleRegExp(subjectDto: SubjectDto): Promise<Post[]> {
        const transactionSession = await this.connection.startSession();
        transactionSession.startTransaction();

        let posts = [];
        await this.subjectRepository.findAllByTitleRegExp(subjectDto.title).then((subjects) => {
            for (let i = 0; i < subjects.length; i++) {
                let partPosts = this.postRepository.findAllBySubjectId(subjects[i].id.toString());
                posts.fill(partPosts);
            }

            transactionSession.commitTransaction();
            return posts;
        });

        throw new NotFoundException(`findPostsBySubjectTitleRegExp`);
    }

    async findAllPostsByUserId(userId: string): Promise<Post[]> {
        return await this.postRepository.findAllByUserId(userId);
    }
}
