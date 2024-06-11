import { Injectable } from '@nestjs/common';
import { rejects } from 'assert';
import Jimp from 'jimp';
import * as path from 'path';

@Injectable()
export class CompressImageService {

    private temp = path.join(process.cwd(), 'public', 'images', 'in');
    private final = path.join(process.cwd(), 'public', 'images', 'out');
    // constructor(
    //     private tempPath: string,
    //     private finalPath: string,
    // ) {
    //     this.tempPath = path.join(process.cwd(), 'public', 'images', 'in');
    //     this.finalPath = path.join(process.cwd(), 'public', 'images', 'out');
    // }

    start(filePath: string) {
        return new Promise((resolve) => {
            Jimp
                .read(path.join(this.temp, filePath))
                .then(image => {
                    return image.quality(10).write(path.join(this.final, filePath));
                })
                .then(() => {
                    console.log('Compress successfully!');
                    resolve(path.join(this.final, filePath));
                }).catch((err) => {
                    console.log('error', err);
                    rejects(err);
                })
        })
    }
}
