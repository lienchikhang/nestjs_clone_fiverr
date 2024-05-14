import { Module } from '@nestjs/common';
import { DetailJobTypeService } from './detail-job-type.service';
import { DetailJobTypeController } from './detail-job-type.controller';
import { ErrorHandlerModule } from 'src/error-handler/error-handler.module';
import { SlugModule } from 'src/slug/slug.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CompressImageModule } from 'src/compress-image/compress-image.module';

@Module({
  imports: [
    ErrorHandlerModule,
    SlugModule,
    CompressImageModule,
    MulterModule.register({
      storage: diskStorage({
        destination: process.cwd() + '/public/images/in',
        filename(req, file, callback) {
          console.log('file in multer::', file);
          callback(null, file.originalname);
        },
      })
    })
  ],
  controllers: [DetailJobTypeController],
  providers: [DetailJobTypeService],
})
export class DetailJobTypeModule { }
