import { PartialType } from '@nestjs/swagger';
import { CreateDetailCommandeDto } from './create-detail-commande.dto';

export class UpdateDetailCommandeDto extends PartialType(CreateDetailCommandeDto) {}
