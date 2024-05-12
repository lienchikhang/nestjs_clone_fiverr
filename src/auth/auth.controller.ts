import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { BodyLoginDto, BodyRegisterDto } from './dto';


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
}
