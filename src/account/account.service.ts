import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { AccountEntity } from './entities/account.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(AccountEntity)
    private accountRepository: Repository<AccountEntity>,
  ) {}
  create(createAccountDto: CreateAccountDto) {
    return 'This action adds a new account';
  }

  async findAll() {
    const accounts = await this.accountRepository.find({
      relations: {
        incomes: true,
        outcomes: true,
      },
    });
    return accounts;
  }

  async findAccountById(accountId: string) {
    const account = await this.accountRepository.findOne({
      where: { id: accountId },
      // relations: { cli: true },
    });
    if (!account) {
      throw new NotFoundException(`Account with id ${accountId} not found `);
    }

    return account;
  }

  async findMovementsWithPictures(accountId: string) {
    const account = await this.accountRepository.findOne({
      where: { id: accountId },
      // relations: { cli: true },
    });
    if (!account) {
      throw new NotFoundException(`Account with id ${accountId} not found `);
    }
    account.incomes = await Promise.all(
      account.incomes.map(async (income) => ({
        ...income,
        pictureIncome: await this.getPhoto(income.idIncome),
        pictureOutcome: await this.getPhoto(income.idOutcome),
      })),
    );
    account.outcomes = await Promise.all(
      account.outcomes.map(async (outcome) => ({
        ...outcome,
        pictureIncome: await this.getPhoto(outcome.idIncome),
        pictureOutcome: await this.getPhoto(outcome.idOutcome),
      })),
    );
    return account;
  }

  async update(id: string, updateAccountDto: UpdateAccountDto) {
    // console.log('updateAccountDto', updateAccountDto);
    const account = await this.accountRepository.preload({
      id,
      ...updateAccountDto,
      updatedAt: new Date(),
    });
    if (!account)
      throw new NotFoundException(`Account with id: ${id} not found`);
    try {
      await this.accountRepository.save(account);
      return account;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} account`;
  }

  async getPhoto(id: string) {
    const account = await this.accountRepository.findOne({
      where: {
        id: id,
      },
      relations: { cli: true },
    });
    return account?.cli.picture;
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);
    console.error(error);
    throw new InternalServerErrorException(
      'Unexpected error. Check server logs',
    );
  }
}
