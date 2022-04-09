import {Types} from "mongoose";
import {Token} from "../model/type/token.type";
import {jwtConstants} from "./jwtConstants";
import {JwtService} from "@nestjs/jwt";

export const generateTokens = async function (jwtService: JwtService, userID: Types.ObjectId,
                                              username: string): Promise<Token> {
    const [accessToken, refreshToken] = await Promise.all(
        [
            jwtService.signAsync(
                {
                    sub: userID,
                    username
                },
                {
                    secret: jwtConstants.ACCESS_SECRET,
                    expiresIn: 60
                }),

            jwtService.signAsync(
                {
                    sub: userID,
                    username
                },
                {
                    secret: jwtConstants.REFRESH_SECRET,
                    expiresIn: 60 * 60 * 3
                })
        ]);

    return {
        access_token: accessToken,
        refresh_token: refreshToken
    };
}
