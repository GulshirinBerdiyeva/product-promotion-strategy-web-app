import {Module} from '@nestjs/common';
import {UserModule} from './user.module';
import {PostModule} from './post.module';
import {DbModule} from './db.module';
import {AuthModule} from "./auth.module";
import {APP_FILTER, APP_GUARD} from "@nestjs/core";
import {CommentModule} from "./comment.module";
import {SubjectModule} from "./subject.module";
import {LikesModule} from "./likes.module";
import {RefreshTokenGuard} from "../guard/refreshToken.guard";
import {AppExceptionFilter} from "../aop/app.exception.filter";
import {AppLogger} from "../aop/app.logger";

@Module({
    imports: [
        DbModule,
        AuthModule,
        UserModule,
        PostModule,
        CommentModule,
        SubjectModule,
        LikesModule
    ],
    providers: [
        AppLogger,
        {
            provide: APP_GUARD,
            useClass: RefreshTokenGuard
        },
        {
            provide: APP_FILTER,
            useClass: AppExceptionFilter
        }
    ]
})
export class AppModule {
}
