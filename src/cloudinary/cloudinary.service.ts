import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import * as path from 'path';

cloudinary.config({
    cloud_name: "drfjok8d7",
    api_key: "319771257136443",
    api_secret: "aGlS8yvKAnYu1JBtT_hzLvFCunQ" // Click 'View Credentials' below to copy your API secret
});


@Injectable()
export class CloudinaryService {

    private final = path.join(process.cwd(), 'public', 'images', 'out');

    constructor() { }

    upload(fileName: string) {
        return cloudinary.uploader.upload(path.join(this.final, fileName), { folder: 'clone_fiverr', public_id: fileName, upload_preset: 'dinfp3e0' })
    }
}
