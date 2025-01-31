import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  
    public  firstName?: string;
    public lastName?: string;
    public password?: string;
    public email?: string;
   public role?: string; 
    public   telephone?: number;
    public tokenValue?: string;  
   
}

