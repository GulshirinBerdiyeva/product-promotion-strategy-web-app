import {Injectable} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {jwtConstants} from "../security/jwtConstants";
import {Request} from "express";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtConstants.REFRESH_SECRET,
            passReqToCallback: true
        });
    }

    async validate(request: Request, payload: any) {
        const refreshToken = request.get('authorization').replace('Bearer', '').trim();
        return {...payload, refreshToken};
    }
}
