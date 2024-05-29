import { Body, Controller, Delete, Get, HttpCode, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { JobService } from './job.service';
import { AuthRefreshService } from 'src/auth-refresh/auth-refresh.service';
import { BodyCreateJobDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { BodyUpdateDto } from 'src/user/dto';
import { CustomGuard } from 'src/strategy/custom.strategy';

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
  ) {
    return this.jobService.getAll(pageSize && Number(pageSize), page && Number(page));
  }

  @Get('get/:id')
  @HttpCode(200)
  getDetailById(
    @Param('id') jobId: string
  ) {
    return this.jobService.getDetailById(Number(jobId));
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

  @Post('update/:id')
  @HttpCode(200)
  @UseGuards(AuthGuard('jwt'))
  update(
    @Param('id') jobId: string,
    @Body() body: BodyUpdateDto,
    @Req() req: Request
  ) {
    return this.jobService.update(Number(jobId), body);
  }

  @Delete('delete/:id')
  @HttpCode(200)
  // @UseGuards(AuthGuard('jwt'))
  delete(
    @Param('id') jobId: string,
    // @Req() req: Request
  ) {
    return this.jobService.delete(Number(jobId));
  }

  @Post('upload/:id')
  @HttpCode(200)
  // @UseGuards(AuthGuard('jwt'))
  uploadImage(
    @Param('id') jobId: string,
    // @Req() req: Request
  ) {
    return this.jobService.uploadImage(Number(jobId));
  }
}
