import { Module } from '@nestjs/common';
import { DetailJobTypeService } from './detail-job-type.service';
import { DetailJobTypeController } from './detail-job-type.controller';
import { ErrorHandlerModule } from 'src/error-handler/error-handler.module';
import { SlugModule } from 'src/slug/slug.module';

@Module({
  imports: [ErrorHandlerModule, SlugModule],
  controllers: [DetailJobTypeController],
  providers: [DetailJobTypeService],
})
export class DetailJobTypeModule { }
