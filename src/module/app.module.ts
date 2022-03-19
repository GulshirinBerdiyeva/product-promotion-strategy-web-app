import { Module } from '@nestjs/common';
import { UserModule } from './user.module';
import { PostModule } from './post.module';
import { DbModule } from './db.module';
import { AuthModule } from "./auth.module";
import { AppController } from "../controller/app.controller";
import { APP_GUARD } from "@nestjs/core";
import {CommentModule} from "./comment.module";
import {SubjectModule} from "./subject.module";
import {LikesModule} from "./likes.module";
import {RefreshTokenGuard} from "../guard/refreshToken.guard";

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
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RefreshTokenGuard
    }
  ]
})
export class AppModule {}
