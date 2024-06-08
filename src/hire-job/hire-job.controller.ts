import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { HireJobService } from './hire-job.service';
import { bodyHiredJobDto, bodyHiredJobUpdateDto } from './dto';
import { Request } from 'express';
import { CustomGuard } from 'src/strategy/custom.strategy';

@Controller('hire-job')
export class HireJobController {
  constructor(private readonly hireJobService: HireJobService) { }

  @Get('get-all')
  @HttpCode(200)
  getAll(
    @Query('pageSize') pageSize: string,
    @Query('page') page: string,
  ) {
    return this.hireJobService.getAll(pageSize && Number(pageSize), page && Number(page));
  }

  @Get('get/:id')
  @HttpCode(200)
  getHiredJobById(
    @Param('id') id: string
  ) {
    return this.hireJobService.getHiredJobById(Number(id));
  }

  @Post('hire/:id')
  @HttpCode(201)
  @UseGuards(CustomGuard)
  hire(
    @Param('id') jobId: string,
    @Req() req: Request,
  ) {
    return this.hireJobService.hire(Number(jobId), req.user as number);
  }

  @Put('update/:id')
  @HttpCode(200)
  updateHiredJob(
    @Param('id') hiredJobId: string,
    @Body() body: bodyHiredJobUpdateDto
  ) {
    return this.hireJobService.updateHiredJob(Number(hiredJobId), body);
  }

  @Delete('delete/:id')
  @HttpCode(200)
  delete(
    @Param('id') hiredJobId: string,
  ) {
    return this.hireJobService.deleteHiredJob(Number(hiredJobId));
  }

  @Get('get-hired-jobs')
  @HttpCode(200)
  getHiredJobsByUserId(
    @Req() req: Request,
    @Query('page') page: string,
    @Query('pageSize') pageSize: string,
  ) {
    return this.hireJobService.getHiredJobsByUserId(req.user as number, page && Number(page), pageSize && Number(pageSize));
  }

  @Post('finish/:hiredJobId')
  @HttpCode(201)
  @UseGuards(CustomGuard)
  finishHiredJob(
    @Param('hiredJobId') hiredJobId: string,
    @Req() req: Request,
  ) {
    return this.hireJobService.finishHiredJob(Number(hiredJobId), req.user as number)
  }
}
