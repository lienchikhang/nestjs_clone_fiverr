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

@Module({
  imports: [ErrorHandlerModule],
  controllers: [JobController],
  providers: [
    JobService,
    JwtStrategy,
    CompressImageService,
    PrismaService,
    ErrorHandlerService,
    SlugService,
    ResponseService,
  ],
})
export class JobModule { }
