import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountService } from './account.service';
import { AccountEntity } from './entities/account.entity';
import { CreateClientDto } from '../client/dto/create-client.dto';

export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => ({
    findOne: jest.fn((entity) => entity),
    // ...
  }),
);

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<any, any>;
};

describe('AccountService', () => {
  let service: AccountService;
  let repositoryMock: MockType<Repository<AccountEntity>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountService,
        {
          provide: getRepositoryToken(AccountEntity),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<AccountService>(AccountService);
    repositoryMock = module.get(getRepositoryToken(AccountEntity));
  });

  it('should get balance', () => {
    const client = {
      id: '123',
      fullName: 'Diego U.',
      email: 'diego@mail.com',
      phone: '3221234567',
      photo: 'https://photo.jpg',
    };
    expect(service.findAccountById(client.id)).toEqual({
      availableCapacity: 47700000,
    });
  });
});
