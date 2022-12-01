import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientService } from './client.service';
import { ClientEntity } from './entities/client.entity';

export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => ({
    findOne: jest.fn((entity) => entity),
    // ...
  }),
);

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<any, any>;
};

describe('ClientService', () => {
  let service: ClientService;
  let repositoryMock: MockType<Repository<ClientEntity>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientService,
        {
          provide: getRepositoryToken(ClientEntity),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<ClientService>(ClientService);
    repositoryMock = module.get(getRepositoryToken(ClientEntity));
  });

  test('should find a user', () => {
    const client = {
      cliId: '123',
      cliFullName: 'Diego Urrego',
      cliEmail: 'diego@mail.com',
      cliPhone: '3101234567',
      cliPhoto: 'https://photo.jpg',
    };
    repositoryMock.findOne?.mockReturnValue(client);
    expect(service.findExistedClient(client.cliId)).toEqual(client);
  });
});
