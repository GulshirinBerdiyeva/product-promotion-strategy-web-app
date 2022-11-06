import {Types} from "mongoose";
import {Token} from "../model/type/token.type";
import {jwtConstants} from "./jwtConstants";
import {JwtService} from "@nestjs/jwt";

export const generateTokens = async function (jwtService: JwtService, userId: Types.ObjectId,
                                              username: string): Promise<Token> {
    const [accessToken, refreshToken] = await Promise.all(
        [
            jwtService.signAsync(
                {
                    sub: userId,
                    username
                },
                {
                    secret: jwtConstants.ACCESS_SECRET,
                    expiresIn: 60
                }),

            jwtService.signAsync(
                {
                    sub: userId,
                    username
                },
                {
                    secret: jwtConstants.REFRESH_SECRET,
                    expiresIn: 60 * 60 * 3
                })
        ]);

    return {
        accessToken: accessToken,
        refreshToken: refreshToken
    };
}
