import { Module } from "@nestjs/common";
import { UserModule } from "./user.module";
import { AuthService } from "../service/auth.service";
import { RefreshTokenStrategy } from "../strategy/refreshToken.strategy";
import { AccessTokenStrategy } from "../strategy/accessToken.strategy";
import { AuthController } from "../controller/auth.controller";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [
        JwtModule.register({}),
        UserModule
    ],
    controllers: [AuthController],
    providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
})
export class AuthModule {}