import { Test, TestingModule } from '@nestjs/testing';
import { AplicationController } from './aplication.controller';
import { AplicationService } from './aplication.service';

describe('AplicationController', () => {
  let controller: AplicationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AplicationController],
      providers: [AplicationService],
    }).compile();

    controller = module.get<AplicationController>(AplicationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
