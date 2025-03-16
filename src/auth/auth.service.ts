import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { jwtConstants } from './constants';
import { LoginClientDto, LoginUserDto } from './auth';
import { ClientService } from 'src/client/client.service';
import { Client } from 'src/client/entities/client.entity';

const bcrypt=require('bcrypt')
@Injectable()
export class AuthService {
    constructor(private userService: UserService,
        private jwtService: JwtService,
        private clientService:ClientService
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
      
      async validCLient(email:string,password:string):Promise<any>{
        const client = await this.clientService.findOneByEmail(email);
        if(client){
          console.log("client",client)
          const isPasswordMatching =await (bcrypt.compare(password,client.password));
          if(isPasswordMatching){
            console.log("client",client)
            return client;
          }
        }
        return null;
      }
      async loginCLient (client:  LoginClientDto) {
        const objectClient :Client= await this.validCLient(client.email,client.password)
        if (objectClient) {
         const payload = { id:objectClient.id,email:objectClient.email};

         return{
          clientId:objectClient.id,
          access_token: this.jwtService.sign(payload, { secret: jwtConstants.secret }),
          

         };

        }
        else {
          throw new NotFoundException('Email et/ou mot de passe sont incorrects')
        }
       
        
      }
}
