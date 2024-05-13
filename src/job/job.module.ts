import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { AuthRefreshModule } from 'src/auth-refresh/auth-refresh.module';
import { JwtStrategy } from 'src/strategy';
import { ErrorHandlerModule } from 'src/error-handler/error-handler.module';

@Module({
  imports: [ErrorHandlerModule],
  controllers: [JobController],
  providers: [JobService, JwtStrategy],
})
export class JobModule { }
