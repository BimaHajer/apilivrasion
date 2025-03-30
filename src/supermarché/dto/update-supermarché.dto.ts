import { PartialType } from '@nestjs/swagger';
import { CreateSupermarchéDto } from './create-supermarché.dto';

export class UpdateSupermarchéDto extends PartialType(CreateSupermarchéDto) {
    id: number;
    updateAt?: Date;
    updatedBy?: number;
}
