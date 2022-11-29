import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AplicationService } from './aplication.service';
import { CreateAplicationDto } from './dto/create-aplication.dto';
import { UpdateAplicationDto } from './dto/update-aplication.dto';

@Controller('aplication')
export class AplicationController {
  constructor(private readonly aplicationService: AplicationService) {}

  @Post()
  create(@Body() createAplicationDto: CreateAplicationDto) {
    return this.aplicationService.create(createAplicationDto);
  }

  @Get()
  findAll() {
    return this.aplicationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aplicationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAplicationDto: UpdateAplicationDto) {
    return this.aplicationService.update(+id, updateAplicationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aplicationService.remove(+id);
  }
}
