import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { MovementService } from './movement.service';
import { MovementEntity } from './entities/movement.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateMovementDto } from './dto/create-movement.dto';

export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => ({
    findOne: jest.fn((entity) => entity),
    // ...
  }),
);

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<any, any>;
};

describe('MovementService', () => {
  let service: MovementService;
  let repositoryMock: MockType<Repository<MovementEntity>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovementService,
        {
          provide: getRepositoryToken(MovementEntity),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<MovementService>(MovementService);
    repositoryMock = module.get(getRepositoryToken(MovementEntity));
  });

  test('should obtain movements', () => {
    const expectedMovements = [
      {
        movementId: '5b474486-367c-413d-b306-2c09fc7eb090',
        movementAccountPhoto: 'https://gravatar.com.co',
        typeOfMovement: 'Income',
        movementReason: 'Pago salario',
        movementAmount: 3500000,
        movementDatetime: '2022-11-29 12:35:43',
      },
      {
        movementId: 'db37a4f7-29db-4669-b3ee-ed56ce855736',
        movementAccountPhoto: 'https://gravatar.com.co',
        typeOfMovement: 'Outcome',
        movementReason: 'Pago cuota Netflix',
        movementAmount: 15000,
        movementDatetime: '2022-11-29 12:35:43',
      },
      {
        movementId: '61123c16-9267-4ffc-9e41-3b8612fc4827',
        movementAccountPhoto: 'https://gravatar.com.co',
        typeOfMovement: 'Income',
        movementReason: 'Compra en Jumbo',
        movementAmount: 342520,
        movementDatetime: '2022-11-29 12:35:43',
      },
    ];
    expect(service.findAll()).toEqual(expectedMovements);
  });

  test('should create movement', () => {
    const movement: CreateMovementDto = {
      paymentReason: 'Pago salario',
      paymentAmount: 3500000,
    };
    expect(service.create(movement)).toEqual({
      movementId: '61123c16-9267-4ffc-9e41-3b8612fc4827',
      movementAccountPhoto: 'https://gravatar.com.co',
      typeOfMovement: 'Income',
      movementReason: 'Pago salario',
      movementAmount: 3500000,
      movementDatetime: '2022-11-29 12:35:43',
    });
  });

  test('should get a loan', () => {
    const movement: CreateMovementDto = {
      paymentReason: 'Prestamo',
      paymentAmount: 2300000,
    };
    expect(service.getLoan(movement)).toBe({ availableCapacity: 47700000 });
  });

  test('should do a payment', () => {
    const movement: CreateMovementDto = {
      paymentReason: 'Prestamo',
      paymentAmount: 2300000,
    };
    expect(service.getLoan(movement)).toEqual({
      movementId: '89b40934-3e4a-449e-ac71-88d2f78b12ad',
      movementReason: 'Segunda cuota prestamo',
      movementAmount: 100000,
      movementDatetime: '2022-11-29 12:35:43',
    });
  });
});
