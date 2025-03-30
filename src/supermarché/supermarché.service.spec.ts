import { Test, TestingModule } from '@nestjs/testing';
import { SupermarchéService } from './supermarché.service';

describe('SupermarchéService', () => {
  let service: SupermarchéService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SupermarchéService],
    }).compile();

    service = module.get<SupermarchéService>(SupermarchéService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
