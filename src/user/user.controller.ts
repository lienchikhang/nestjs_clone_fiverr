import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { use } from 'passport';
import { BodyUpdateDto } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('get-all')
  @HttpCode(200)
  getUsers(
    @Query('page') page: string,
    @Query('pageSize') pageSize: string,
    @Query('name') name: string,
  ) {
    return this.userService.getUsers(pageSize && Number(pageSize), page && Number(page), name && name);
  }

  @Get('get/:id')
  @HttpCode(200)
  getUserById(
    @Param('id') userId: string,
  ) {
    return this.userService.getUserById(Number(userId));
  }

  @Delete('delete/:id')
  @HttpCode(200)
  delete(
    @Param('id') userId: string,
  ) {
    return this.userService.delete(Number(userId));
  }

  @Put('update/:id')
  @HttpCode(200)
  update(
    @Param('id') userId: string,
    @Body() bodyUser: BodyUpdateDto,
  ) {
    return this.userService.updateUser(Number(userId), bodyUser);
  }

  @Post('upload/:id')
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(
    @Param('id') userId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.userService.uploadImage(Number(userId), file);
  }

}
