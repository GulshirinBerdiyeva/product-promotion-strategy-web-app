import {Body, Controller, HttpCode, HttpStatus, Post, UseGuards} from "@nestjs/common";
import {AuthService} from "../service/auth.service";
import {UserDto} from "../dto/request/user/user.dto";
import {GetCurrentUserId} from "../decorator/getCurrentUserId.decorator";
import {Public} from "../decorator/public.decorator";
import {RefreshTokenGuard} from "../guard/refreshToken.guard";
import {GetCurrentUser} from "../decorator/getCurrentUser.decorator";
import {EmailAndPasswordDto} from "../dto/request/user/emailAndPassword.dto";
import {TokenAndIdDto} from "../dto/response/tokenAndId.dto";

@Controller('api/v1/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Public()
    @Post('/sign-up')
    @HttpCode(HttpStatus.CREATED)
    async signUp(@Body() userDto: UserDto): Promise<TokenAndIdDto> {
        return this.authService.signUp(userDto);
    }

    @Public()
    @Post('/sign-in')
    @HttpCode(HttpStatus.OK)
    async signIn(@Body() emailAndPasswordDto: EmailAndPasswordDto): Promise<TokenAndIdDto> {
        return this.authService.signIn(emailAndPasswordDto);
    }

    @Post('/logout')
    @HttpCode(HttpStatus.OK)
    async logOut(@GetCurrentUserId() userId: string) {
        return this.authService.logOut(userId);
    }

    @UseGuards(RefreshTokenGuard)
    @Post('/refresh')
    @HttpCode(HttpStatus.OK)
    async refreshToken(@GetCurrentUserId() userId: string,
                       @GetCurrentUser('refreshToken') refreshToken: string): Promise<TokenAndIdDto> {
        return this.authService.refreshToken(userId, refreshToken);
    }
}