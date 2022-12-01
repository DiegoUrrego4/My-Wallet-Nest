import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientService {
  createClient(createClientDto: CreateClientDto) {
    return {
      token: 'Este es tu nuevo token',
    };
  }

  findAll() {
    return `This action returns all client`;
  }

  findExistedClient(term: string) {
    return `This action returns a #${term} client`;
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
