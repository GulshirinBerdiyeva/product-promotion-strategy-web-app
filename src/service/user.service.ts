import {Injectable} from '@nestjs/common';
import {UserRepository} from "../repository/user.repository";
import {InjectConnection} from "@nestjs/mongoose";
import mongoose from "mongoose";
import {UserUtil} from "../util/user.util";
import {User} from "../model/user.model";
import {UserDto} from "../dto/request/user/user.dto";
import {AppLogger} from "../aop/app.logger";

@Injectable()
export class UserService {
    constructor(@InjectConnection() private readonly connection: mongoose.Connection,
                private readonly userRepository: UserRepository,
                private readonly userUtil: UserUtil,
                private readonly logger: AppLogger) {
    }

    async editById(id: string, userDto: UserDto): Promise<User> {
        const transactionSession = await this.connection.startSession();
        transactionSession.startTransaction();

        let user = await this.userUtil.findById(id);
        let editedUser = await this.userUtil.editUser(user, userDto);
        let newUser = this.userRepository.save(editedUser);

        transactionSession.commitTransaction();
        return newUser;
    }

    async findAll(page: number, size: number): Promise<User[]> {
        return await this.userRepository.findAll(page, size);
    }

    async findById(id: string): Promise<User> {
        return await this.userUtil.findById(id);
    }

    async deleteById(id: string) {
        await this.userUtil.deleterById(id);
    }
}
