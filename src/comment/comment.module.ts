import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ErrorHandlerModule } from 'src/error-handler/error-handler.module';
import { ResponseModule } from 'src/response/response.module';

@Module({
  imports: [
    PrismaModule,
    ErrorHandlerModule,
    ResponseModule,
  ],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule { }
