import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { sign, verify, decode } from 'jsonwebtoken';
import { PayloadDecodeDto, PayloadDto } from './dto';

@Injectable()
export class TokenService {
    constructor(
        private config: ConfigService
    ) { }

    createAccess(payload: PayloadDto, exp?: string): string {
        return sign(payload, this.config.get('SECRET_ACCESS_TOKEN'), {
            expiresIn: '5m',
        });
    }

    createRefresh(payload: PayloadDto) {
        return sign(payload, this.config.get('SECRET_REFRESH_TOKEN'), {
            expiresIn: '20m',
        });
    }

    decode(token: string): PayloadDecodeDto {
        return decode(token) as PayloadDecodeDto;
    }

    verifyRefresh(token: string) {
        try {
            verify(token, this.config.get('SECRET_REFRESH_TOKEN'));
        } catch (error) {
            console.log('error in verifyRefresh:::', error)
        }
        // return "123"
    }
}
