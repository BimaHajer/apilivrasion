import { Test, TestingModule } from '@nestjs/testing';
import { DetailCommandeController } from './detail-commande.controller';
import { DetailCommandeService } from './detail-commande.service';

describe('DetailCommandeController', () => {
  let controller: DetailCommandeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetailCommandeController],
      providers: [DetailCommandeService],
    }).compile();

    controller = module.get<DetailCommandeController>(DetailCommandeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
