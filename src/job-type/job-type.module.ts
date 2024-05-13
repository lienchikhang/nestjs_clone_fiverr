import { Module } from '@nestjs/common';
import { JobTypeService } from './job-type.service';
import { JobTypeController } from './job-type.controller';
import { ErrorHandlerModule } from 'src/error-handler/error-handler.module';
import { SlugModule } from 'src/slug/slug.module';

@Module({
  imports: [ErrorHandlerModule, SlugModule],
  controllers: [JobTypeController],
  providers: [JobTypeService],
})
export class JobTypeModule { }
