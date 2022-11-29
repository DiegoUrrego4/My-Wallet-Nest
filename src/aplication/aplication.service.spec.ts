import { Test, TestingModule } from '@nestjs/testing';
import { AplicationService } from './aplication.service';

describe('AplicationService', () => {
  let service: AplicationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AplicationService],
    }).compile();

    service = module.get<AplicationService>(AplicationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
