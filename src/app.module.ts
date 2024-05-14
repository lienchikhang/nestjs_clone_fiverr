import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { JobModule } from './job/job.module';
import { UserModule } from './user/user.module';
import { JobTypeModule } from './job-type/job-type.module';
import { PrismaModule } from './prisma/prisma.module';
import { ResponseModule } from './response/response.module';
import { BcryptModule } from './bcrypt/bcrypt.module';
import { TokenModule } from './token/token.module';
import { ErrorHandlerModule } from './error-handler/error-handler.module';
import { AuthRefreshModule } from './auth-refresh/auth-refresh.module';
import { JwtModule } from '@nestjs/jwt';
import { SlugModule } from './slug/slug.module';
import { DetailJobTypeModule } from './detail-job-type/detail-job-type.module';
import { CompressImageModule } from './compress-image/compress-image.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      global: true,
    }),
    AuthModule,
    JobModule,
    UserModule,
    JobTypeModule,
    PrismaModule,
    ResponseModule,
    BcryptModule,
    TokenModule,
    ErrorHandlerModule,
    AuthRefreshModule,
    SlugModule,
    DetailJobTypeModule,
    CompressImageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
