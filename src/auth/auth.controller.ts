import { Body, Controller, Get, Post,Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './auth';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login-user')
    signIn(@Body() signInDto: LoginUserDto) {
      console.log("signInDto controller",signInDto)
      return this.authService.signIn(signInDto);
      
    }

    @Get('profile')
    getProfile(@Request() req) {
      return req.user;
    }
}
