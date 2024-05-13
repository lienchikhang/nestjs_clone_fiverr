import { Global, Module } from '@nestjs/common';
import { AuthRefreshService } from './auth-refresh.service';
import { TokenModule } from 'src/token/token.module';
import { ErrorHandlerModule } from 'src/error-handler/error-handler.module';

@Module({
  imports: [TokenModule, ErrorHandlerModule],
  providers: [AuthRefreshService],
  exports: [AuthRefreshService],
})
export class AuthRefreshModule { }
