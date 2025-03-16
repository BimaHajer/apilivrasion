import { Body, Controller, Get, Post,Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginClientDto, LoginUserDto } from './auth';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login-user')
    signIn(@Body() signInDto: LoginUserDto) {
      console.log("signInDto controller",signInDto)
      return this.authService.signIn(signInDto);
      
    }
    //authclient 
    @Post('login-client')
    loginClient(@Body() signInDto: LoginClientDto) {
      return this.authService.loginCLient(signInDto);
      
    }

    @Get('profile')
    getProfile(@Request() req) {
      return req.user;
    }
}
