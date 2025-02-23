import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { jwtConstants } from './constants';
import { LoginUserDto } from './auth';

const bcrypt=require('bcrypt')
@Injectable()
export class AuthService {
    constructor(private userService: UserService,
        private jwtService: JwtService
    ) {}

      async ValidateUser(email:string,password:string):Promise<any>{
        const user = await this.userService.findOneByEmail(email);
        if(user){
          console.log("user",user)
          const isPasswordMatching =await (bcrypt.compare(password,user.password));
          if(isPasswordMatching){
            console.log("userr",user)
            return user;
          }
        }
        return null;
      }
      async signIn (user:  LoginUserDto) {
        const objectUser :User= await this.ValidateUser(user.email,user.password)
     console.log("user object!!!!",objectUser)
        if (objectUser) {
         const payload = { id:objectUser.id,email:objectUser.email,role:objectUser.role};

         return{
          userId:objectUser.id,
          access_token: this.jwtService.sign(payload, { secret: jwtConstants.secret }),
          role:objectUser.role,

         };

        }
        else {
          throw new NotFoundException('Email et/ou mot de passe sont incorrects')
        }
       
        
      }
}
