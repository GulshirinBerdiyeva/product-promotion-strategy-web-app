import {Injectable} from "@nestjs/common";
import {TokenAndIdDto} from "../dto/response/tokenAndId.dto";
import {Token} from "../model/type/token.type";
import {Types} from "mongoose";

@Injectable()
export class AuthUtil {
    constructor() {
    }

    async createTokensAndIdDto(tokens: Token, userId: Types.ObjectId): Promise<TokenAndIdDto> {
        return {
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
            userId: userId
        }
    }
}
