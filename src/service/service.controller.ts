import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { AtGuard } from 'src/auth/common/guards';

@Controller('services')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post()
  @UseGuards(AtGuard)
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.serviceService.create(createServiceDto);
  }

  @Get()
  @UseGuards(AtGuard)
  findAll() {
    return this.serviceService.findAll();
  }

  @Get(':id')
  @UseGuards(AtGuard)
  findOne(@Param('id') id: string) {
    return this.serviceService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AtGuard)
  update(@Body() updateServiceDto: UpdateServiceDto) {
    return this.serviceService.update(updateServiceDto);
  }

  @Delete(':id')
  @UseGuards(AtGuard)
  remove(@Param('id') id: string) {
    return this.serviceService.remove(+id);
  }
}
