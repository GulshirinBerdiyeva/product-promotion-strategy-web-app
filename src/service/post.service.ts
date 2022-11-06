import {Injectable} from '@nestjs/common';
import {PostDto} from '../dto/request/post/post.dto';
import {UserUtil} from "../util/user.util";
import {SubjectUtil} from "../util/subject.util";
import {PostRepository} from "../repository/post.repository";
import {InjectConnection} from "@nestjs/mongoose";
import mongoose from "mongoose";
import {SubjectDto} from "../dto/request/subject/subject.dto";
import {SubjectRepository} from "../repository/subject.repository";
import {Post} from "../model/post.model";
import {PostUtil} from "../util/post.util";

@Injectable()
export class PostService {
    constructor(@InjectConnection() private readonly connection: mongoose.Connection,
                private readonly userUtil: UserUtil,
                private readonly subjectUtil: SubjectUtil,
                private readonly postUtil: PostUtil,
                private readonly postRepository: PostRepository,
                private readonly subjectRepository: SubjectRepository,) {
    }

    async publishPost(userId: string, postDto: PostDto, files: any): Promise<Post> {
        const transactionSession = await this.connection.startSession();
        transactionSession.startTransaction();

        let user = await this.userUtil.findById(userId);
        let subject = await this.subjectUtil.findById(postDto.subjectId);

        const post = await this.postUtil.createPost(postDto, subject.id, user.id);
        let newPost = this.postRepository.save(post);

        transactionSession.commitTransaction();
        return newPost;
    }

    async findAllBySubjectTitleRegExp(subjectDto: SubjectDto, page: number, size: number): Promise<Post[]> {
        let subjects = await this.subjectRepository.findAllByTitleRegExp(subjectDto.title, page, size);
        let posts = [];
        for (let i = 0; i < subjects.length; i++) {
            let subjectPosts = this.postRepository.findAllBySubjectId(subjects[i].id.toString(), page, size);
            posts.fill(subjectPosts);
        }
        return posts;
    }

    async findAllPostsByUserId(userId: string, page: number, size: number): Promise<Post[]> {
        return await this.postRepository.findAllByUserId(userId, page, size);
    }

    async findById(id: string): Promise<Post> {
        return await this.postUtil.findById(id);
    }

    async deleteById(id: string) {
        await this.postUtil.deleteById(id);
    }
}
