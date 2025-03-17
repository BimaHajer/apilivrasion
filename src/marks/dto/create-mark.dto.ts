import { Picture } from "src/pictures/entities/picture.entity";

export class CreateMarkDto {
    id: number;
  
    titre: string;
  
    description: string;
  
     status: boolean ;
     picture: string ;
     createAt: Date ;
    updateAt: Date ;
     isActive: boolean ;
     createBy: number ;
    updatedBy: number ;
   pictures: Picture[];
}

