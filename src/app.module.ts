import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import configuration from './config/configuration';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './auth/common/guards';
// import { Middleware } from './app.middleware';
import { Valid } from './utils/validUser';
import { PitchModule } from './pitch/pitch.module';
import { ServiceModule } from './service/service.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    PitchModule,
    ServiceModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ConfigService,
    { provide: 'VALID', useClass: Valid },
    { provide: APP_GUARD, useClass: AtGuard },
  ],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(Middleware).forRoutes('*');
  // }
}
