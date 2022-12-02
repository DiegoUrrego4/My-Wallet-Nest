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

  test('should create a user', () => {
    const client = {
      fullName: 'Diego Urrego',
      email: 'diego@mail.com',
      phone: '3101234567',
      photo: 'https://photo.jpg',
    };
    const tokenExpected =
      'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjhXblpUZDlMU3EzMDBnRHc4am5EcSJ9.eyJnaXZlbl9uYW1lIjoiRGllZ28iLCJmYW1pbHlfbmFtZSI6IlVycmVnbyBHYW1ib2EiLCJuaWNrbmFtZSI6ImRpZWdvLnVycmVnbyIsIm5hbWUiOiJEaWVnbyBVcnJlZ28gR2FtYm9hIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FMbTV3dTJaT3BaNkxoVzQybUlVbkhTTGZ3UkxxWGItbGF6THV3NDZjbHVkPXM5Ni1jIiwibG9jYWxlIjoiZXMiLCJ1cGRhdGVkX2F0IjoiMjAyMi0xMS0yN1QwNTo1OTozOC41MThaIiwiZW1haWwiOiJkaWVnby51cnJlZ29Ac29ma2EuY29tLmNvIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImlzcyI6Imh0dHBzOi8vZGV2LWdzeml3a2ZqdTdvcDY2Z3oudXMuYXV0aDAuY29tLyIsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTE4NDQzNzg2NzI5OTU1ODY2NTA2IiwiYXVkIjoibjdwcFEyVVFsWWxWN202WHJLeU80Rnk4R2FwR3dHVk8iLCJpYXQiOjE2Njk2ODU3NDYsImV4cCI6MTY2OTcyMTc0Niwic2lkIjoiM1Bod2RpTjhTcnJFcE1iejgtU2o5YTRRYXBTNkRfMjYifQ.ctuFW0zmpfBYdsEQ1bdBAdT8FajivNBBNqElhXl7GKKW6eqc3b_nJxaDcR7_dyxMvJhB-C7Rb1SAKSDKDiXbXDwhNjRtQclrdvLUmJ556nnoHbt_1H8BNXBezxN_jCOvJWthES71mZtL3NQjs4nCVVIF_OnIrPHh303Xp9pO6UdadSlsCb8Le-EmUl48rIdKJpgpt_4JxuM_81MlJEX4ix3oljLqN3adu_3BRZvzf1nfibPR-BWTYKsOqMpJ68lpACUC5LPKr7wMRUkf4QuV5OoIboDGT-8vukfoSmFL6P8UeIS6NKMOS8yDJvktD477I6RAHqq4kMoCH8m3wEkTtw';
    expect(service.createClient(client)).toBe(tokenExpected);
  });

  test('should find a user by emil or phone', () => {
    const client = {
      cliId: '123',
      cliFullName: 'Diego Urrego',
      cliEmail: 'diego@mail.com',
      cliPhone: '3101234567',
      cliPhoto: 'https://photo.jpg',
    };
    repositoryMock.findOne?.mockReturnValue(client);
    expect(service.findExistedClient(client.cliId)).toEqual(client);
    expect(service.findExistedClient(client.cliPhone)).toEqual(client);
  });
});
