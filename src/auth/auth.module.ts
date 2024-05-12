import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { BcryptModule } from 'src/bcrypt/bcrypt.module';
import { TokenModule } from 'src/token/token.module';
import { ErrorHandlerModule } from 'src/error-handler/error-handler.module';

@Module({
  imports: [BcryptModule, TokenModule, ErrorHandlerModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
