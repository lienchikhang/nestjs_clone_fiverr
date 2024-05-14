import { Body, Controller, Get, HttpCode, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { DetailJobTypeService } from './detail-job-type.service';
import { BodyDetailJobType, BodyDetailJobTypeLink, BodyDetailJobTypeUpdate, DetailJobTypeLink, DetailJobTypeLinkUpdate } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';

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

  @Post('upload/:id')
  @HttpCode(201)
  @UseInterceptors(FileInterceptor('file'))
  upload(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string
  ) {
    return this.detailJobTypeService.uploadImage(file, Number(id));
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

  @Put('update/:id')
  @HttpCode(200)
  update(
    @Body() body: BodyDetailJobTypeUpdate,
    @Param('id') id: string,
  ) {
    return this.detailJobTypeService.update(body, Number(id));
  }

  @Put('update-link/:id')
  @HttpCode(200)
  updateLinks(
    @Body() body: DetailJobTypeLinkUpdate,
    @Param('id') id: string,
  ) {
    return this.detailJobTypeService.updateLink(body, Number(id));
  }
}
