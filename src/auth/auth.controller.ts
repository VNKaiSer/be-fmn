import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiTags, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { Tokens } from './types';
import { AtGuard, RtGuard } from './common/guards';
import { GetCurrentUser, GetCurentUserId, Public } from './common/decorators';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('/sign-in')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: AuthDto })
  logIn(@Body() body: AuthDto) {
    return this.authService.logIn(body);
  }

  @Public()
  @Post('/sign-up')
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: AuthDto })
  signUp(@Body() body: AuthDto): Promise<Tokens> {
    console.log(body);
    return this.authService.signUp(body);
  }

  @UseGuards(AtGuard)
  @Post('/log-out')
  @HttpCode(HttpStatus.OK)
  // @ApiHeader({ name: 'Authorization', description: 'Bearer' })
  @ApiQuery({ name: 'id', type: Number })
  @ApiBearerAuth('JWT-auth')
  logOut(@GetCurentUserId() id: number) {
    console.log(id);
    return this.authService.logOut(id['sub']);
  }

  // @Public()
  @UseGuards(RtGuard)
  @HttpCode(HttpStatus.OK)
  @Post('/refresh')
  refeshToken(
    @GetCurentUserId() id: number,
    @GetCurrentUser('refreshToken') rt: string,
  ) {
    return this.authService.refeshToken(id['sub'], rt);
  }
}
