import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import AuthBadRequestExceptionFilter from '../exceptions/http/AuthBadRequestExceptionFilter';
import Utils from '../Utils';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: Utils.quickUUID(),
      signOptions: { expiresIn: 3600 },
    }),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_FILTER,
      useClass: AuthBadRequestExceptionFilter,
    },
  ],
})
export class AuthModule {}
