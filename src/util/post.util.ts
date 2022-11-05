import {Injectable, NotFoundException} from "@nestjs/common";
import {AppLogger} from "../aop/app.logger";
import {PostRepository} from "../repository/post.repository";
import {Post} from "../model/post.model";

@Injectable()
export class PostUtil {
    constructor(private readonly postRepository: PostRepository,
                private readonly logger: AppLogger) {
    }

    async getPostById(postId: string): Promise<Post> {
        return this.postRepository.findOneById(postId)
            .catch((err) => {
                this.logger.error(`post with id=${postId} not found`, err);
                throw new NotFoundException(`post with id=${postId} not found`);
            });
    }
}
