import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { JobModule } from './job/job.module';
import { UserModule } from './user/user.module';
import { JobTypeModule } from './job-type/job-type.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    JobModule,
    UserModule,
    JobTypeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
