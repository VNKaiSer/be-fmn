import { Module } from '@nestjs/common';
import { PitchService } from './pitch.service';
import { PitchController } from './pitch.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [PitchController],
  providers: [PitchService],
  imports: [PrismaModule],
})
export class PitchModule {}
