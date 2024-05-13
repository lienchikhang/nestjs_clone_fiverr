import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { DetailJobTypeService } from './detail-job-type.service';
import { BodyDetailJobType, BodyDetailJobTypeLink } from './dto';

@Controller('detail-job-type')
export class DetailJobTypeController {
  constructor(private readonly detailJobTypeService: DetailJobTypeService) { }

  @Post('create')
  @HttpCode(201)
  create(
    @Body() body: BodyDetailJobType
  ) {
    return this.detailJobTypeService.create(body);
  }

  @Post('create-link')
  @HttpCode(201)
  createLinks(
    @Body() body: BodyDetailJobTypeLink
  ) {
    return this.detailJobTypeService.createLinks(body);
  }

  @Get('get-all')
  @HttpCode(200)
  getAll() {
    return this.detailJobTypeService.getAll();
  }
}
