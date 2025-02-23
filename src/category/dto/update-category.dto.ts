import { PartialType } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category.dto';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
    public id?: number ;
    public name?: string ;
    public description?: string ;
    public status?: boolean ;
}
