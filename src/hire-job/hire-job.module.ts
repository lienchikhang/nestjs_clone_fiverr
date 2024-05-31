import { Module } from '@nestjs/common';
import { HireJobService } from './hire-job.service';
import { HireJobController } from './hire-job.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ResponseModule } from 'src/response/response.module';
import { ErrorHandlerModule } from 'src/error-handler/error-handler.module';

@Module({
  imports: [
    PrismaModule,
    ResponseModule,
    ErrorHandlerModule,

  ],
  controllers: [HireJobController],
  providers: [HireJobService],
})
export class HireJobModule { }
