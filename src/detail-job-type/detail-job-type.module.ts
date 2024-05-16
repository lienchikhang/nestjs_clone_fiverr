import { Module } from '@nestjs/common';
import { DetailJobTypeService } from './detail-job-type.service';
import { DetailJobTypeController } from './detail-job-type.controller';
import { ErrorHandlerModule } from 'src/error-handler/error-handler.module';
import { SlugModule } from 'src/slug/slug.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CompressImageModule } from 'src/compress-image/compress-image.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [
    ErrorHandlerModule,
    SlugModule,
    CompressImageModule,
    CloudinaryModule,
    MulterModule.register({
      storage: diskStorage({
        destination: process.cwd() + '/public/images/in',
        filename(req, file, callback) {
          console.log('file in multer::', file);
          callback(null, new Date().getTime() + '.' + file.originalname.split('.')[1]);
        },
      })
    })
  ],
  controllers: [DetailJobTypeController],
  providers: [DetailJobTypeService],
})
export class DetailJobTypeModule { }
