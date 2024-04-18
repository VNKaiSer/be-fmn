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
import { PitchService } from './pitch.service';
import { CreatePitchDto } from './dto/create-pitch.dto';
import { UpdatePitchDto } from './dto/update-pitch.dto';
import { AtGuard } from 'src/auth/common/guards';

@Controller('pitchs')
export class PitchController {
  constructor(private readonly pitchService: PitchService) {}
  @UseGuards(AtGuard)
  @Post()
  create(@Body() createPitchDto: CreatePitchDto) {
    return this.pitchService.create(createPitchDto);
  }
  @UseGuards(AtGuard)
  @Get()
  findAll() {
    return this.pitchService.findAll();
  }
  @UseGuards(AtGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pitchService.findOne(+id);
  }
  @UseGuards(AtGuard)
  @Post(':id')
  update(@Body() updatePitchDto: UpdatePitchDto) {
    return this.pitchService.update(updatePitchDto);
  }
  @UseGuards(AtGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pitchService.remove(+id);
  }

  @Get('pitch-type/:id')
  findPitchByType(@Param('id') id: string) {
    return this.pitchService.findPitchByType(+id);
  }

  @Post('pitch-type')
  createPitchType(@Body('name') name: string) {
    return this.pitchService.createPitchType(name);
  }

  @Patch('pitch-type/:id')
  updatePitchType(@Param('id') id: string, @Body('name') name: string) {
    return this.pitchService.updatePitchType(+id, name);
  }

  @Delete('pitch-type/:id')
  removePitchType(@Param('id') id: string) {
    return this.pitchService.removePitchType(+id);
  }
}
