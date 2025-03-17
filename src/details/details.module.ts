import { Module } from '@nestjs/common';
import { DetailsService } from './details.service';
import { DetailsController } from './details.controller';
import { ProduitDetail } from 'src/produits/dto/create-produit.dto';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [DetailsController],
  providers: [DetailsService],
  imports:[TypeOrmModule.forFeature([ProduitDetail])] 
})
export class DetailsModule {}
