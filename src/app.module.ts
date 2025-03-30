import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ClientModule } from './client/client.module';
import { LivreurModule } from './livreur/livreur.module';
import { ProduitsModule } from './produits/produits.module';
import { CategoryModule } from './category/category.module';
import { MarksModule } from './marks/marks.module';
import { PicturesModule } from './pictures/pictures.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { PriceModule } from './price/price.module';
import { TvaModule } from './tva/tva.module';
import { DetailsModule } from './details/details.module';
import { CommandeModule } from './commande/commande.module';
import { DetailCommandeModule } from './detail-commande/detail-commande.module';
import { BoutiqueModule } from './boutique/boutique.module';
import { SupermarchéModule } from './supermarché/supermarché.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'livraison',
        autoLoadEntities: true,
        synchronize: true,
      }),
  
}),
    UserModule,
    AuthModule,
    ClientModule,
    LivreurModule,
    ProduitsModule,
    CategoryModule,
    MarksModule,
    PicturesModule,
    RestaurantModule,
    PriceModule,
    TvaModule,
    DetailsModule,
    CommandeModule,
    DetailCommandeModule,
    BoutiqueModule,
    SupermarchéModule,
   
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}



