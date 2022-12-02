import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AplicationService } from './aplication.service';
import { AplicationEntity } from './entities/aplication.entity';
import { CreateAplicationDto } from './dto/create-aplication.dto';

export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => ({
    findOne: jest.fn((entity) => entity),
    // ...
  }),
);

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<any, any>;
};

describe('AplicationService', () => {
  let service: AplicationService;
  let repositoryMock: MockType<Repository<AplicationEntity>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AplicationService,
        {
          provide: getRepositoryToken(AplicationEntity),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<AplicationService>(AplicationService);
    repositoryMock = module.get(getRepositoryToken(AplicationEntity));
  });

  it('should return app color', () => {
    const app: CreateAplicationDto = {
      appColorTheme: 'blue',
      changed: false,
    };
    expect(service.findAppColor()).toBe(app.appColorTheme);
  });

  test('should change app color', () => {
    const app: CreateAplicationDto = {
      appColorTheme: 'blue',
    };
    expect(service.changeAppColor(app)).toEqual({
      appColorTheme: 'blue',
      changed: true,
    });
  });
});
