import {Types} from "mongoose";

export class TokenAndIdDto {
    readonly accessToken: string;
    readonly refreshToken: string;
    readonly userId: Types.ObjectId;
}
