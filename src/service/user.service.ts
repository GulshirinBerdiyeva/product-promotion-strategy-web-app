import {Injectable} from '@nestjs/common';
import {UserRepository} from "../repository/user.repository";
import {InjectConnection} from "@nestjs/mongoose";
import mongoose from "mongoose";
import {UserUtil} from "../util/user.util";
import {UserDto} from "../dto/request/user.dto";
import {User} from "../model/user.model";

@Injectable()
export class UserService {
    constructor(@InjectConnection() private readonly connection: mongoose.Connection,
                private readonly userRepository: UserRepository,
                private readonly userUtil: UserUtil,) {
    }

    async editUser(id: string, userDto: UserDto) {
        const transactionSession = await this.connection.startSession();
        transactionSession.startTransaction();

        await this.userUtil.getUserById(id).then((user) => {
            this.userUtil.editUser(user, userDto).then((editedUser) => {

                this.userUtil.setUserRole(userDto);
                this.userRepository.save(editedUser);
                transactionSession.commitTransaction();
            });
        });
    }

    async findAll(): Promise<User[]> {
        return await this.userRepository.findAll();
    }
}
