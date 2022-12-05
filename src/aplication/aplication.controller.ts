import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { AplicationService } from './aplication.service';
import { CreateAplicationDto } from './dto/create-aplication.dto';
import { UpdateAplicationDto } from './dto/update-aplication.dto';

@Controller('app')
export class AplicationController {
  constructor(private readonly aplicationService: AplicationService) {}

  @Post('theme')
  create(@Body() createAplicationDto: CreateAplicationDto) {
    return this.aplicationService.changeAppColor(createAplicationDto);
  }

  @Get()
  findAll() {
    return this.aplicationService.findAll();
  }

  @Get(':clientId')
  findOne(@Param('clientId', ParseUUIDPipe) clientId: string) {
    return this.aplicationService.findOne(clientId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAplicationDto: UpdateAplicationDto,
  ) {
    return this.aplicationService.update(id, updateAplicationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aplicationService.remove(+id);
  }
}
