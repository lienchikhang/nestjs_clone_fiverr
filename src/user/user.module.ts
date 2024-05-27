import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ResponseService } from 'src/response/response.service';
import { ErrorHandlerService } from 'src/error-handler/error-handler.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { SlugService } from 'src/slug/slug.service';
import { CompressImageService } from 'src/compress-image/compress-image.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: path.join(process.cwd(), 'public', 'images', 'in'),
        filename(req, file, callback) {
          callback(null, new Date().getTime().toString() + '.' + file.originalname.split('.')[1]);
        },
      }),
      limits: {
        files: 1,
        fileSize: 30 * 1024 * 1024,
      }
    })
  ],
  controllers: [UserController],
  providers: [
    UserService,
    ErrorHandlerService,
    PrismaService,
    BcryptService,
    SlugService,
    CompressImageService,
    CloudinaryService,
  ],
})
export class UserModule { }
