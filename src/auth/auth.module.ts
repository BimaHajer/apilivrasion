import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule, JwtService } from '@nestjs/jwt';

import { jwtConstants } from './constants';
import { AuthGuard } from './auth.guard';
import { ClientModule } from 'src/client/client.module';



@Module({
  controllers: [AuthController],
  imports: [
    UserModule,
    ClientModule,
    
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '600000s' },
    }),
  ],
  providers: [AuthService,JwtService],
  exports: [AuthService,JwtService
  ],
})

export class AuthModule {}
