import {ForbiddenException, Injectable, NotFoundException} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {Token} from "../model/type/token.type";
import {UserDto} from "../dto/request/user.dto";
import {getHash} from "../util/dataEncryption.util";
import * as bcrypt from "bcrypt";
import {generateTokens} from "../security/jwt";
import {UserRepository} from "../repository/user.repository";
import {UserUtil} from "../util/user.util";
import {InjectConnection} from "@nestjs/mongoose";
import * as mongoose from "mongoose";

@Injectable()
export class AuthService {

    constructor(@InjectConnection() private readonly connection: mongoose.Connection,
                private readonly userRepository: UserRepository,
                private readonly userUtil: UserUtil,
                private readonly jwtService: JwtService) {}

    async signUp(userDto: UserDto): Promise<Token> {
        const transactionSession = await this.connection.startSession();
        transactionSession.startTransaction();

        await this.userUtil.setUserRole(userDto);
        await this.userUtil.encryptUserPassword(userDto);

        const user = await this.userRepository.save(userDto);

        const tokens = await generateTokens(this.jwtService, user.id, user.username);

        await this.updateRefreshToken(user.id.toString(), tokens.refresh_token);

        await transactionSession.commitTransaction();
        return tokens;
    }

    async signIn(userDto: UserDto): Promise<Token> {
        const transactionSession = await this.connection.startSession();
        transactionSession.startTransaction();

        const user = await this.userRepository.findOneByName(userDto.username);
        if (!user) {
            throw new NotFoundException(`User '${userDto.username}' not found`);
        }

        const isMatch = await bcrypt.compare(userDto.password, user.password);
        if (!isMatch) {
            throw new NotFoundException(`Password '${userDto.password}' is incorrect`);
        }
        const tokens = await generateTokens(this.jwtService, user.id, user.username);

        await this.updateRefreshToken(user.id.toString(), tokens.refresh_token);

        await transactionSession.commitTransaction();
        return tokens;
    }

    async logOut(userID: string) {
        await this.userRepository.updateRefreshTokenByID(userID, null);
    }

    async refreshToken(userId: string, refreshToken: string): Promise<Token> {
        const transactionSession = await this.connection.startSession();
        transactionSession.startTransaction();

        const user = await this.userRepository.findOneById(userId);
        if (!user || !user.refreshToken) {
            throw new ForbiddenException(`User '${userId}' not found or refresh token is null`);
        }

        const isMatch = await bcrypt.compare(refreshToken, user.refreshToken);
        if (!isMatch) {
            throw new ForbiddenException(`User '${userId}' refresh token not match`);
        }
        const tokens = await generateTokens(this.jwtService, user.id, user.username);

        await this.updateRefreshToken(user.id.toString(), tokens.refresh_token);

        await transactionSession.commitTransaction();
        return tokens;
    }

    async updateRefreshToken(userId: string, refreshToken: string) {
        const hash = await getHash(refreshToken);
        await this.userRepository.updateRefreshTokenByID(userId, hash);
    }
}