import {NestFactory} from '@nestjs/core';
import {AppModule} from './module/app.module';
import {ValidationPipe} from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe({skipMissingProperties: true}));

    await app.listen(3000);

    console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
