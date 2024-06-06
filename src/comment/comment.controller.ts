import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { BodyCreateDto, BodyUpdateDto } from './dto';
import { Request } from 'express';
import { CustomGuard } from 'src/strategy/custom.strategy';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) { }

  @Get('get/:id')
  @HttpCode(200)
  getByJobId(
    @Param('id') jobId: string,
    @Query('page') page: string,
    @Query('pageSize') pageSize: string,
  ) {
    return this.commentService.getByJobId(Number(jobId), page && Number(page), pageSize && Number(pageSize));
  }

  @Post('add/:id')
  @HttpCode(201)
  @UseGuards(CustomGuard)
  add(
    @Param('id') jobId: string,
    @Body() body: BodyCreateDto,
    @Req() req: Request,
  ) {
    return this.commentService.add(req.user as number, Number(jobId), body);
  }

  @Delete('delete/:id')
  @HttpCode(200)
  @UseGuards(CustomGuard)
  delete(
    @Param('id') commentId: string,
    @Req() req: Request,
  ) {
    return this.commentService.delete(Number(commentId), req.user as number);
  }

  @Put('update/:id')
  @HttpCode(200)
  @UseGuards(CustomGuard)
  update(
    @Param('id') commentId: string,
    @Req() req: Request,
    @Body() body: BodyUpdateDto,
  ) {
    return this.commentService.update(Number(commentId), req.user as number, body);
  }
}
