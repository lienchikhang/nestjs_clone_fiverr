import { Controller, Get, UseGuards } from '@nestjs/common';
import { JobService } from './job.service';
import { AuthRefreshService } from 'src/auth-refresh/auth-refresh.service';

@Controller('job')
export class JobController {
  constructor(
    private readonly jobService: JobService,
  ) { }

  @Get('test')
  @UseGuards(AuthRefreshService)
  test() {
    return true;
  }
}
