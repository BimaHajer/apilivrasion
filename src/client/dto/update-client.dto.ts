import { PartialType } from '@nestjs/swagger';
import { CreateClientDto } from './create-client.dto';

export class UpdateClientDto extends PartialType(CreateClientDto) {
    public  firstName?: string;
    public lastName?: string;
    public password?: string;
    public email?: string;
   public address?: string; 
   public phone?: number;
    public tokenValue?: string;  
}
