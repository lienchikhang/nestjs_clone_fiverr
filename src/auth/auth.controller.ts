import { Body, Controller, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { BodyLoginDto, BodyRegisterDto } from './dto';
import { AuthRefreshService } from 'src/auth-refresh/auth-refresh.service';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  @HttpCode(201)
  register(
    @Body() body: BodyRegisterDto
  ) {
    return this.authService.register(body);
  }


  @Post('login')
  @HttpCode(200)
  login(
    @Body() body: BodyLoginDto
  ) {
    return this.authService.login(body);
  }

  @Post('refresh')
  @HttpCode(200)
  @UseGuards(AuthRefreshService)
  refreshToken(
    @Req() req
  ) {
    console.log('req:: ', req.user)
    return this.authService.refreshToken(Number(req.user.payload.userId), req.user.refreshToken);
  }
}
