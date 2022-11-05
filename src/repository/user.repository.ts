import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {User, UserDocument} from '../model/user.model';
import {UserDto} from '../dto/request/user.dto';

@Injectable()
export class UserRepository {
    constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>,) {
    }

    async save(userDto: UserDto): Promise<User> {
        const user = new this.userModel(userDto);
        user.id = user._id;
        return user.save();
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async findOneById(id: string): Promise<User> {
        return this.userModel.findOne({_id: id}).exec();
    }

    async findOneByName(username: string): Promise<User> {
        return this.userModel.findOne({username: username}).exec();
    }

    async delete(id: string) {
        await this.userModel.findOneAndRemove({_id: id}).exec();
    }

    async updateRefreshTokenByID(userId: string, refreshTokenHash: string) {
        await this.userModel.updateOne({_id: userId}, {$set: {refreshToken: refreshTokenHash}}).exec();
    }
}
