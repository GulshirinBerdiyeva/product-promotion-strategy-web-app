import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "../service/auth.service";
import { UserDto } from "../dto/user.dto";
import { Token } from "../model/type/token.type";
import { Types } from "mongoose";
import { GetCurrentUserId } from "../decorator/getCurrentUserId.decorator";
import { Public } from "../decorator/public.decorator";
import { RefreshTokenGuard } from "../guard/refreshToken.guard";
import { GetCurrentUser } from "../decorator/getCurrentUser.decorator";

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Public()
    @Post('/signUp')
    async signUp(@Body() userDto: UserDto): Promise<Token> {
        return this.authService.signUp(userDto);
    }

    @Public()
    @Post('/signIn')
    async signIn(@Body() userDto: UserDto): Promise<Token> {
        return this.authService.signIn(userDto);
    }

    @Post('/logout')
    async logOut(@GetCurrentUserId() userID: Types.ObjectId) {
        return this.authService.logOut(userID);
    }

    @Public()
    @UseGuards(RefreshTokenGuard)
    @Post('/refresh')
    async refreshToken(@GetCurrentUserId() userID: Types.ObjectId,
                       @GetCurrentUser('refreshToken') refreshToken: string) {
        return this.authService.refreshToken(userID, refreshToken);
    }
}