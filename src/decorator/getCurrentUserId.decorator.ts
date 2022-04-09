import {createParamDecorator, ExecutionContext} from "@nestjs/common";
import {Types} from "mongoose";

export const GetCurrentUserId = createParamDecorator(
    (_:undefined, context: ExecutionContext): Types.ObjectId => {
        const request = context.switchToHttp().getRequest();
        return request.user['sub'];
    });
