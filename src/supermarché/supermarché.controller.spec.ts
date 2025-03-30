import { Test, TestingModule } from '@nestjs/testing';
import { SupermarchéController } from './supermarché.controller';
import { SupermarchéService } from './supermarché.service';

describe('SupermarchéController', () => {
  let controller: SupermarchéController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SupermarchéController],
      providers: [SupermarchéService],
    }).compile();

    controller = module.get<SupermarchéController>(SupermarchéController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
