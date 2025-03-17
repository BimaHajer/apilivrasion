export class CreateClientDto {
  id:number;
    firstname: string;
    lastname: string;
    email: string;
    password:string;
    telephone: string;
    adress: string;
  createAt: Date;
  updateAt:Date; 
  createBy:number; 
  updatedBy:number; 
 
    
}
