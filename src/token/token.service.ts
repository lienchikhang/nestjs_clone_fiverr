import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { sign, verify, decode } from 'jsonwebtoken';
import { PayloadDecodeDto, PayloadDto } from './dto';

@Injectable()
export class TokenService {
    constructor(
        private config: ConfigService
    ) { }

    createAccess(payload: PayloadDto): string {
        return sign(payload, this.config.get('SECRET_ACCESS_TOKEN'), {
            expiresIn: '15m',
        });
    }

    createRefresh(payload: PayloadDto) {
        return sign(payload, this.config.get('SECRET_REFRESH_TOKEN'), {
            expiresIn: '1d',
        });
    }

    decode(token: string): PayloadDecodeDto {
        return decode(token) as PayloadDecodeDto;
    }
}
