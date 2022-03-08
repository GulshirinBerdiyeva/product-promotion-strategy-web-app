import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/user.module';
import { PostModule } from './modules/post.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/prod-prom-statistics'),

    UserModule,
    PostModule,
  ],
})
export class AppModule {}
