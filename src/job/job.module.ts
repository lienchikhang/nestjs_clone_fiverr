import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { AuthRefreshModule } from 'src/auth-refresh/auth-refresh.module';
import { JwtStrategy } from 'src/strategy';
import { ErrorHandlerModule } from 'src/error-handler/error-handler.module';
import { CompressImageService } from 'src/compress-image/compress-image.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ErrorHandlerService } from 'src/error-handler/error-handler.service';
import { SlugService } from 'src/slug/slug.service';
import { ResponseService } from 'src/response/response.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CompressImageModule } from 'src/compress-image/compress-image.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SlugModule } from 'src/slug/slug.module';
import { ResponseModule } from 'src/response/response.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [
    ErrorHandlerModule,
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
    }),
    CompressImageModule,
    PrismaModule,
    SlugModule,
    ResponseModule,
    CloudinaryModule
  ],
  controllers: [JobController],
  providers: [
    JobService,
    JwtStrategy,
  ],
})
export class JobModule { }
