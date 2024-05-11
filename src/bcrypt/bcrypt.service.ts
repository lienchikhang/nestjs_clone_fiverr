import { Injectable } from '@nestjs/common';
import { compareSync, hash } from 'bcrypt'

@Injectable()
export class BcryptService {
    async encode(data: string) {
        return hash(data, 7);
    }

    async decode(dataPlain: string, dataHash: string) {
        return compareSync(dataPlain, dataHash)
    }
}
