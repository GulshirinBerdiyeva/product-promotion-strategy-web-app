import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {User, UserModel} from '../model/user.model';
import {UserController} from '../controller/user.controller';
import {UserService} from '../service/user.service';
import {UserRepository} from "../repository/user.repository";
import {UserUtil} from "../util/user.util";
import {AppLogger} from "../aop/app.logger";

@Module({
    imports: [
        MongooseModule.forFeature([{name: User.name, schema: UserModel}]),
    ],
    controllers: [UserController],
    providers: [UserRepository, UserService, UserUtil, AppLogger],
    exports: [UserRepository, UserUtil]
})
export class UserModule {
}
