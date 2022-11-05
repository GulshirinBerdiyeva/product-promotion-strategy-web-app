import {Body, Controller, Post, UseGuards} from "@nestjs/common";
import {AuthService} from "../service/auth.service";
import {UserDto} from "../dto/request/user.dto";
import {Token} from "../model/type/token.type";
import {GetCurrentUserId} from "../decorator/getCurrentUserId.decorator";
import {Public} from "../decorator/public.decorator";
import {RefreshTokenGuard} from "../guard/refreshToken.guard";
import {GetCurrentUser} from "../decorator/getCurrentUser.decorator";

@Controller('api/v1/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Public()
    @Post('/sign-up')
    async signUp(@Body() userDto: UserDto): Promise<Token> {
        return this.authService.signUp(userDto);
    }

    @Public()
    @Post('/sign-in')
    async signIn(@Body() userDto: UserDto): Promise<Token> {
        return this.authService.signIn(userDto);
    }

    @Post('/logout')
    async logOut(@GetCurrentUserId() userID: string) {
        return this.authService.logOut(userID);
    }

    @UseGuards(RefreshTokenGuard)
    @Post('/refresh')
    async refreshToken(@GetCurrentUserId() userID: string,
                       @GetCurrentUser('refreshToken') refreshToken: string) {
        return this.authService.refreshToken(userID, refreshToken);
    }
}