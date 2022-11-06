import {ForbiddenException, Injectable, NotFoundException, UnauthorizedException} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {getHash} from "../util/dataEncryption.util";
import * as bcrypt from "bcrypt";
import {generateTokens} from "../security/jwt";
import {UserRepository} from "../repository/user.repository";
import {UserUtil} from "../util/user.util";
import {InjectConnection} from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import {EmailAndPasswordDto} from "../dto/request/user/emailAndPassword.dto";
import {UserDto} from "../dto/request/user/user.dto";
import {TokenAndIdDto} from "../dto/response/tokenAndId.dto";
import {AuthUtil} from "../util/auth.util";

@Injectable()
export class AuthService {
    constructor(@InjectConnection() private readonly connection: mongoose.Connection,
                private readonly userRepository: UserRepository,
                private readonly userUtil: UserUtil,
                private readonly jwtService: JwtService,
                private readonly authUtil: AuthUtil) {
    }

    async signUp(userDto: UserDto): Promise<TokenAndIdDto> {
        const transactionSession = await this.connection.startSession();
        transactionSession.startTransaction();

        const user = await this.userUtil.createUser(userDto);
        const newUser = await this.userRepository.save(user);

        const tokens = await generateTokens(this.jwtService, newUser.id, newUser.username);
        await this.updateRefreshToken(newUser.id.toString(), tokens.refreshToken);

        await transactionSession.commitTransaction();
        return this.authUtil.createTokensAndIdDto(tokens, newUser.id);
    }

    async signIn(emailAndPasswordDto: EmailAndPasswordDto): Promise<TokenAndIdDto> {
        const transactionSession = await this.connection.startSession();
        transactionSession.startTransaction();

        const user = await this.userRepository.findByEmail(emailAndPasswordDto.email);
        if (!user) {
            throw new NotFoundException(`User '${emailAndPasswordDto.email}' not found`);
        }

        const isMatch = await bcrypt.compare(emailAndPasswordDto.password, user.passwordHash);
        if (!isMatch) {
            throw new UnauthorizedException(`Password is incorrect`);
        }
        const tokens = await generateTokens(this.jwtService, user.id, user.username);
        await this.updateRefreshToken(user.id.toString(), tokens.refreshToken);

        await transactionSession.commitTransaction();
        return this.authUtil.createTokensAndIdDto(tokens, user.id);
    }

    async logOut(userId: string) {
        await this.userRepository.updateRefreshTokenByID(userId, null);
    }

    async refreshToken(userId: string, refreshToken: string): Promise<TokenAndIdDto> {
        const transactionSession = await this.connection.startSession();
        transactionSession.startTransaction();

        const user = await this.userRepository.findById(userId);
        if (!user || !user.refreshToken) {
            throw new ForbiddenException(`User '${userId}' not found or refresh token is null`);
        }

        const isMatch = await bcrypt.compare(refreshToken, user.refreshToken);
        if (!isMatch) {
            throw new ForbiddenException(`User '${userId}' refresh token not match`);
        }
        const tokens = await generateTokens(this.jwtService, user.id, user.username);

        await this.updateRefreshToken(user.id.toString(), tokens.refreshToken);

        await transactionSession.commitTransaction();
        return this.authUtil.createTokensAndIdDto(tokens, user.id);
    }

    async updateRefreshToken(userId: string, refreshToken: string) {
        const hash = await getHash(refreshToken);
        await this.userRepository.updateRefreshTokenByID(userId, hash);
    }
}