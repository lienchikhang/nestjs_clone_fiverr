import { Injectable } from '@nestjs/common';
import Jimp from 'jimp';

@Injectable()
export class CompressImageService {
    constructor() { }

    start(filePath: string) {
        Jimp
            .read(filePath)
            .then(image => {
                return image.quality(10)
            })
    }
}
