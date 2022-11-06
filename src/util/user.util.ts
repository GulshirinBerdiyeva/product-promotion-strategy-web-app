import {Injectable, NotFoundException} from "@nestjs/common";
import {User} from "../model/user.model";
import {UserDto} from "../dto/request/user/user.dto";
import {userRoleConstants} from "./userRoleConstants";
import {UserRole} from "../model/type/userRole.type";
import {getHash} from "./dataEncryption.util";
import {UserRepository} from "../repository/user.repository";
import {AppLogger} from "../aop/app.logger";

@Injectable()
export class UserUtil {
    constructor(private readonly userRepository: UserRepository,
                private readonly logger: AppLogger) {
    }

    async createUser(userDto: UserDto): Promise<User> {
        let role = await this.getRole(userDto.birthDate);
        let passwordHash = await this.encryptValue(userDto.password);

        const user = new User();
        user.firstName = userDto.firstName;
        user.lastName = userDto.lastName;
        user.username = userDto.username;
        user.birthDate = userDto.birthDate;
        user.passwordHash = passwordHash.toString();
        user.role = role.toString();
        user.email = userDto.email;
        user.socialMediaUrl = userDto.socialMediaUrl;
        user.avatarFileName = userDto.avatarFileName;
        return user;
    }

    async getRole(birthDate: Date): Promise<String> {
        let age = await this.getAge(birthDate);

        if (age <= userRoleConstants.YOUNG_ADULT) {
            return UserRole.YOUNG_ADULT.toString();
        } else if (age <= userRoleConstants.MIDDLE_AGED_ADULT) {
            return UserRole.MIDDLE_AGED_ADULT.toString();
        } else {
            return UserRole.OLD_AGED_ADULT.toString();
        }
    }

    async getAge(birthdate: Date): Promise<Number> {
        let currentDate = new Date();
        return currentDate.getFullYear() - birthdate.getFullYear();
    }

    async encryptValue(value: string): Promise<String> {
        return getHash(value);
    }

    async findById(userId: string): Promise<User> {
        return this.userRepository.findById(userId)
            .then(user => {
                if (user == undefined) {
                    throw new NotFoundException(`User with id=${userId} not found`);
                }
                return user;
            })
    }

    async editUser(user: User, userDto: UserDto): Promise<User> {
        if (userDto.firstName != null) {
            user.firstName = userDto.firstName;
        }
        if (userDto.lastName !== null) {
            user.lastName = userDto.lastName;
        }
        if (userDto.username != null) {
            user.username = userDto.username;
        }
        if (userDto.birthDate != null) {
            user.birthDate = userDto.birthDate;
            let role = await this.getRole(userDto.birthDate);
            user.role = role.toString();
        }
        if (userDto.email != null) {
            user.email = userDto.email;
        }
        if (userDto.socialMediaUrl != null) {
            user.socialMediaUrl = userDto.socialMediaUrl;
        }
        if (userDto.avatarFileName != null) {
            user.avatarFileName = userDto.avatarFileName;
        }
        return user;
    }

    async deleterById(userId: string) {
        await this.findById(userId);
        await this.userRepository.deleteById(userId);
    }
}
