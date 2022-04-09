import {Injectable, NotFoundException} from "@nestjs/common";
import {User} from "../model/user.model";
import {UserDto} from "../dto/request/user.dto";
import {userRoleConstants} from "./userRoleConstants";
import {UserRole} from "../model/type/userRole.type";
import {getHash} from "./dataEncryption.util";
import {UserRepository} from "../repository/user.repository";
import {AppLogger} from "../aop/app.logger";

@Injectable()
export class UserUtil {

    constructor(private readonly userRepository: UserRepository,
                private readonly logger: AppLogger) {}

    async getUserById(userId: string): Promise<User> {
        return this.userRepository.findOneById(userId)
            .catch((err) => {
                this.logger.error(`user with id=${userId} not found`, err);
                throw new NotFoundException(`user with id=${userId} not found`);
            })
    }

    async encryptUserPassword(userDto: UserDto) {
        userDto.password = await getHash(userDto.password);
    }

    async setUserRole(userDto: UserDto) {
        if (userDto.role == null) {
            let age = userDto.age;

            if (age <= userRoleConstants.YOUNG_ADULT) {
                userDto.role = UserRole.YOUNG_ADULT.toString();
            } else if(age <= userRoleConstants.MIDDLE_AGED_ADULT) {
                userDto.role = UserRole.MIDDLE_AGED_ADULT.toString();
            } else {
                userDto.role = UserRole.OLD_AGED_ADULT.toString();
            }
        }
    }

    async editUser(user: User, userDto: UserDto): Promise<User> {
        if (userDto.username != null) {
            user.username = userDto.username;
        }
        if (userDto.firstName != null) {
            user.firstName = userDto.firstName;
        }
        if (userDto.lastName != null) {
            user.lastName = userDto.lastName;
        }
        if (userDto.age != null) {
            user.age = userDto.age;
        }
        if (userDto.email != null) {
            user.email = userDto.email;
        }
        if (userDto.socialMediaUrl != null) {
            user.socialMediaUrl = userDto.socialMediaUrl;
        }
        if (userDto.photoFileName != null) {
            user.photoFileName = userDto.photoFileName;
        }
        return user;
    }
 }
