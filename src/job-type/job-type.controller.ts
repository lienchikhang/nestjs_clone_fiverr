import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query } from '@nestjs/common';
import { JobTypeService } from './job-type.service';
import { BodyJobType } from './dto';

@Controller('job-type')
export class JobTypeController {
  constructor(private readonly jobTypeService: JobTypeService) { }

  @Post('create')
  @HttpCode(201)
  create(
    @Body() body: BodyJobType
  ) {
    return this.jobTypeService.create(body);
  }

  @Get('get-all')
  @HttpCode(200)
  getAll(
    @Query('page') page: string,
    @Query('pageSize') pageSize: string,
  ) {
    return this.jobTypeService.getAll(pageSize && Number(pageSize), page && Number(page));
  }

  @Get('get/:id')
  @HttpCode(201)
  getDetailById(
    @Param('id') id: string,
  ) {
    return this.jobTypeService.getDetailById(Number(id));
  }

  @Put('update/:id')
  @HttpCode(201)
  update(
    @Body() body: BodyJobType,
    @Param('id') id: string,
  ) {
    return this.jobTypeService.update(Number(id), body);
  }

  @Delete('delete/:id')
  @HttpCode(201)
  delete(
    @Param('id') id: string,
  ) {
    return this.jobTypeService.delete(Number(id));
  }
}
