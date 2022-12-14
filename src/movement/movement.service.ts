import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateMovementDto } from './dto/create-movement.dto';
import { UpdateMovementDto } from './dto/update-movement.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MovementEntity } from './entities/movement.entity';
import { Repository } from 'typeorm';
import { AccountService } from '../account/account.service';

@Injectable()
export class MovementService {
  constructor(
    @InjectRepository(MovementEntity)
    private movementRepository: Repository<MovementEntity>,
    private accountService: AccountService,
  ) {}
  async create(createMovementDto: CreateMovementDto) {
    const initialAccountValue = {
      id: '',
      clientId: '',
      balance: '',
      credit: '',
      state: 0,
      updatedAt: undefined,
      createdAt: undefined,
      deletedAt: undefined,
      cli: {},
      incomes: [],
      outcomes: [],
    };
    try {
      const { idIncome, idOutcome, amount } = createMovementDto;

      if (idIncome === idOutcome) {
        this.loan(idIncome, amount);
      } else {
        // this.payment(idIncome, idOutcome, amount);
        const incomeAccount =
          (await this.accountService.findAccountById(idIncome)) ||
          initialAccountValue;

        const outcomeAccount =
          (await this.accountService.findAccountById(idOutcome)) ||
          initialAccountValue;

        if (Number(outcomeAccount.balance) < Number(amount)) {
          throw new BadRequestException(
            'Error, cant descount the amount because it exceed your savings',
            {
              cause: new Error(),
              description:
                "Error, can't descount the amount because it exceed your savings",
            },
          );
        }
        incomeAccount.balance = (
          Number(incomeAccount.balance) + Number(amount)
        ).toString();

        outcomeAccount.balance = (
          Number(outcomeAccount.balance) - Number(amount)
        ).toString();

        this.accountService.update(incomeAccount.id, incomeAccount);
        this.accountService.update(outcomeAccount.id, outcomeAccount);
      }

      const movement = this.movementRepository.create(createMovementDto);
      await this.movementRepository.save(movement);
      return movement;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async loan(id: string, amount: string) {
    console.log('Entrando a LOAN');
    const initialAccountValue = {
      id: '',
      clientId: '',
      balance: '',
      credit: '',
      state: 0,
      updatedAt: undefined,
      createdAt: undefined,
      deletedAt: undefined,
      cli: {},
      incomes: [],
      outcomes: [],
    };
    const account =
      (await this.accountService.findAccountById(id)) || initialAccountValue;
    account.balance = (Number(account.balance) + Number(amount)).toString();
    account.credit = (Number(account.credit) - Number(amount)).toString();
    this.accountService.update(account.id, account);
  }

  findAll() {
    const movements = this.movementRepository.find();
    return movements;
  }

  findOne(id: string) {
    return `This action returns a #${id} movement`;
  }

  findAvailableCapacity(id: string) {
    return `This action returns a #${id} available capacity`;
  }

  update(id: number, updateMovementDto: UpdateMovementDto) {
    return `This action updates a #${id} movement`;
  }

  remove(id: number) {
    return `This action removes a #${id} movement`;
  }
  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);
    console.error(error);
    throw new InternalServerErrorException(
      'Unexpected error. Check server logs',
    );
  }
}
