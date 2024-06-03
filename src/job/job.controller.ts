import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { JobService } from './job.service';
import { AuthRefreshService } from 'src/auth-refresh/auth-refresh.service';
import { BodyCreateJobDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { BodyUpdateDto } from 'src/user/dto';
import { CustomGuard } from 'src/strategy/custom.strategy';
import { bodyUpdateJobDto } from './dto/bodyUpdateJob.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('job')
export class JobController {
  constructor(
    private readonly jobService: JobService,
  ) { }


  @Get('get-all')
  @HttpCode(200)
  getAll(
    @Query('pageSize') pageSize: string,
    @Query('page') page: string,
    @Query('name') name: string,
  ) {
    return this.jobService.getAll(pageSize && Number(pageSize), page && Number(page), name && name);
  }

  @Get('get/:id')
  @HttpCode(200)
  getDetailById(
    @Param('id') jobId: string,
    @Query('page') page: string
  ) {
    return this.jobService.getDetailById(Number(jobId), page && Number(page));
  }

  @Post('create')
  @HttpCode(201)
  @UseGuards(CustomGuard)
  create(
    @Body() body: BodyCreateJobDto,
    @Req() req: any
  ) {
    return this.jobService.create(body, req.user);
  }

  @Put('update/:id')
  @HttpCode(200)
  @UseGuards(CustomGuard)
  update(
    @Param('id') jobId: string,
    @Body() body: bodyUpdateJobDto,
    @Req() req: Request
  ) {
    return this.jobService.update(Number(jobId), body, req.user as number);
  }

  @Delete('delete/:id')
  @HttpCode(200)
  @UseGuards(CustomGuard)
  delete(
    @Param('id') jobId: string,
    @Req() req: Request
  ) {
    return this.jobService.delete(Number(jobId), req.user as number);
  }

  @Post('upload/:id')
  @HttpCode(200)
  @UseGuards(CustomGuard)
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(
    @Param('id') jobId: string,
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.jobService.uploadImage(Number(jobId), req.user as number, file);
  }
}
