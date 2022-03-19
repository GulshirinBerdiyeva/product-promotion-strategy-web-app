import { ForbiddenException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Token } from "../model/type/token.type";
import { Types } from "mongoose";
import { UserDto } from "../dto/user.dto";
import { UserService } from "./user.service";
import { getHash } from "../util/dataEncryption.util";
import * as bcrypt from "bcrypt";
import { generateTokens } from "../security/jwt";

@Injectable()
export class AuthService {

    constructor(private readonly userService: UserService,
                private readonly jwtService: JwtService) {}

    async signUp(userDto: UserDto): Promise<Token> {
        const user = await this.userService.create(userDto);

        const tokens = await generateTokens(this.jwtService, user.id, user.username);

        await this.updateRefreshToken(user.id, tokens.refresh_token);

        return tokens;
    }

    async signIn(userDto: UserDto): Promise<Token> {
        const user = await this.userService.findOneByName(userDto.username);
        if (!user) {
            throw new ForbiddenException("Access denied");
        }

        const isMatch = await bcrypt.compare(userDto.password, user.password);
        if (!isMatch) {
            throw new ForbiddenException("Access denied");
        }
        const tokens = await generateTokens(this.jwtService, user.id, user.username);

        await this.updateRefreshToken(user.id, tokens.refresh_token);

        return tokens;
    }

    async logOut(userID: Types.ObjectId) {
        await this.userService.updateRefreshTokenByID(userID, null);
    }

    async refreshToken(userID: Types.ObjectId, refreshToken: string): Promise<Token> {
        const user = await this.userService.findOneById(userID);
        if (!user || !user.refreshTokenHash) {
            throw new ForbiddenException("Access denied");
        }

        const isMatch = await bcrypt.compare(refreshToken, user.refreshTokenHash);
        if (!isMatch) {
            throw new ForbiddenException("Access denied");
        }
        const tokens = await generateTokens(this.jwtService, user.id, user.username);

        await this.updateRefreshToken(user.id, tokens.refresh_token);

        return tokens;
    }

    async updateRefreshToken(userId: Types.ObjectId, refreshToken: string) {
        const hash = await getHash(refreshToken);
        await this.userService.updateRefreshTokenByID(userId, hash);
    }
}