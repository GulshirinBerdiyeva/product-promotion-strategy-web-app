import {Injectable, NotFoundException} from "@nestjs/common";
import {AppLogger} from "../aop/app.logger";
import {PostRepository} from "../repository/post.repository";
import {Post} from "../model/post.model";
import {PostDto} from "../dto/request/post/post.dto";
import {Types} from "mongoose";

@Injectable()
export class PostUtil {
    constructor(private readonly postRepository: PostRepository,
                private readonly logger: AppLogger) {
    }

    async createPost(postDto: PostDto, subjectId: Types.ObjectId, userId: Types.ObjectId): Promise<Post> {
        const post = new Post();
        post.description = postDto.description;
        // post.photoFileName =
        post.userId = userId;
        post.subjectId = subjectId;
        return post;
    }

    async createPostDto(description: string, subjectId: string): Promise<PostDto> {
        const postDto = new PostDto();
        postDto.description = description;
        postDto.subjectId = subjectId;
        return postDto;
    }

    async findById(postId: string): Promise<Post> {
        return this.postRepository.findById(postId)
            .then(post => {
                if (post == undefined) {
                    throw new NotFoundException(`Post with id=${postId} not found`);
                }
                return post;
            })
    }

    async deleteById(postId: string) {
        await this.findById(postId);
        await this.postRepository.deleteById(postId);
    }
}
