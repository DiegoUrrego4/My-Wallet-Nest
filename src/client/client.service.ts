import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientEntity } from './entities/client.entity';
import { AccountEntity } from '../account/entities/account.entity';
import { AplicationEntity } from '../aplication/entities/aplication.entity';

import { validate as isUUID } from 'uuid';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(ClientEntity)
    private clientRepository: Repository<ClientEntity>,
    @InjectRepository(AccountEntity)
    private accountRepository: Repository<AccountEntity>,
  ) {}

  async createClient(createClientDto: CreateClientDto) {
    const { email } = createClientDto;
    const existedClient = await this.findExistedClient(email);
    if (existedClient)
      return {
        message: 'Cliente existente en BD',
        client: existedClient,
      };
    try {
      const client = this.clientRepository.create({
        ...createClientDto,
        account: new AccountEntity(),
        app: new AplicationEntity(),
      });
      await this.clientRepository.save(client);
      return client;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll() {
    const clients = await this.clientRepository.find({
      relations: {
        account: true,
        app: true,
      },
    });
    return clients;
  }
  findClientById = async (term: string) => {
    const client = await this.findExistedClient(term);
    if (!client) {
      // return false;
      throw new NotFoundException(
        `el cliente con el termino #${term} no fue encontrado en BD`,
      );
    }
    return client;
  };

  async findExistedClient(term: string) {
    let client: ClientEntity | null;
    if (isUUID(term)) {
      client = await this.clientRepository.findOneBy({ id: term });
    } else {
      const queryBuilder = this.clientRepository.createQueryBuilder('cli');
      client = await queryBuilder
        .where('cli.phone =:phone OR cli.email =:email', {
          phone: term,
          email: term,
        })
        .leftJoinAndSelect('cli.account', 'clientAccount')
        .leftJoinAndSelect('cli.app', 'clientApp')
        .getOne();
    }
    if (!client) {
      return false;
      // throw new NotFoundException(
      //   `el cliente con el termino #${term} no fue encontrado en BD`,
      // );
    }
    return client;
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);
    console.error(error);
    throw new InternalServerErrorException(
      'Unexpected error. Check server logs',
    );
  }
}
