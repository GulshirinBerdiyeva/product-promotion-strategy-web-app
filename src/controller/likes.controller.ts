import {Body, Controller, Post} from '@nestjs/common';
import {LikesService} from "../service/likes.service";
import {LikesDto} from "../dto/request/likes.dto";

@Controller('likes')
export class LikesController {
    constructor(private readonly likesService: LikesService) {
    }

    @Post()
    async createLike(@Body() likesDto: LikesDto) {
        await this.likesService.createLike(likesDto);
    }

    // @Get()
    // async findAll(): Promise<Likes[]> {
    //     return await this.likesService.findAll();
    // }
    //
    // @Get(':id')
    // async findOne(@Param('id') id: string): Promise<Likes> {
    //     return this.likesService.findOneById(id);
    // }
    //
    // @Delete(':id')
    // async delete(@Param('id') id: string) {
    //     return this.likesService.delete(id);
    // }
}
