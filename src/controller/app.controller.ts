import { Controller, Get } from "@nestjs/common";
import { Public } from "../decorator/public.decorator";

@Controller()
export class AppController {

    @Public()
    @Get('/')
    async index() {
        return 'Welcome to web app';
    }
}