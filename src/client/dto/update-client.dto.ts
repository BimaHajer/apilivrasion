import { PartialType } from '@nestjs/swagger';
import { CreateClientDto } from './create-client.dto';

export class UpdateClientDto extends PartialType(CreateClientDto) {
    public  firstname?: string;
    public lastname?: string;
    public password?: string;
    public email?: string;
   public adress?: string; 
   public telephone?: string;
    public tokenValue?: string;  
}
