import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {User, UserDocument} from '../model/user.model';

@Injectable()
export class UserRepository {
    constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>,) {
    }

    async save(user: User): Promise<User> {
        const newUser = new this.userModel(user);
        newUser.id = newUser._id;
        return newUser.save();
    }

    async findAll(page: number, size: number): Promise<User[]> {
        return this.userModel.find()
            .skip(page)
            .limit(size)
            .exec();
    }

    async findById(id: string): Promise<User> {
        return this.userModel.findOne({_id: id}).exec();
    }

    async findByEmail(email: string): Promise<User> {
        return this.userModel.findOne({email: email}).exec();
    }

    async updateRefreshTokenByID(userId: string, refreshTokenHash: string) {
        await this.userModel
            .updateOne(
                {_id: userId},
                {$set: {refreshToken: refreshTokenHash}})
            .exec();
    }

    async deleteById(id: string) {
        await this.userModel.findOneAndRemove({_id: id}).exec();
    }
}
