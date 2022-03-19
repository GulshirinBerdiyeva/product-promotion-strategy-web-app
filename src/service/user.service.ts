import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from '../model/user.model';
import { UserDto } from '../dto/user.dto';
import { getHash } from "../util/dataEncryption.util";

@Injectable()
export class UserService {

  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>,) {}

  async create(userDto: UserDto): Promise<User> {
    userDto.password = await getHash(userDto.password);

    const user = new this.userModel(userDto);
    user.id = user._id;

    return user.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOneById(id: Types.ObjectId): Promise<User> {
    return this.userModel.findOne({ _id: id }).exec();
  }

  async findOneByName(username: string): Promise<User> {
    return this.userModel.findOne({username: username}).exec();
  }

  async delete(id: Types.ObjectId) {
    return await this.userModel.findOneAndRemove({ _id: id }).exec();
  }

  async updateRefreshTokenByID(userId: Types.ObjectId, refreshTokenHash: string) {
    return await this.userModel.updateOne({_id: userId}, {$set: {refreshTokenHash: refreshTokenHash}}).exec();
  }
}
