import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientEntity } from './entities/client.entity';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(ClientEntity)
    private clientRepository: Repository<ClientEntity>,
  ) {}

  createClient(createClientDto: CreateClientDto) {
    return {
      token: 'Este es tu nuevo token',
    };
  }

  findAll() {
    return `This action returns all client`;
  }

  async findExistedClient(term: string) {
    const client: ClientEntity | null = await this.clientRepository.findOneBy({
      cliId: term,
    });
    console.log('client :>> ', client);
    return client;
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
