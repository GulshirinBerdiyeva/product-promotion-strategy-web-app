import {Injectable} from "@nestjs/common";
import {MulterModuleOptions, MulterOptionsFactory} from "@nestjs/platform-express";

@Injectable()
export class MulterPostConfig implements MulterOptionsFactory {
    createMulterOptions(): Promise<MulterModuleOptions> | MulterModuleOptions {
        return {
            dest: './downloads/posts',
        };
    }
}