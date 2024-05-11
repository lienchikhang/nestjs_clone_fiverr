import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { BcryptModule } from 'src/bcrypt/bcrypt.module';

@Module({
  imports: [BcryptModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
