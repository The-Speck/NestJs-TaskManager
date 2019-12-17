import { DynamicModule, Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '../config/config.service';
import AuthBadRequestExceptionFilter from '../exceptions/http/AuthBadRequestExceptionFilter';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserRepository } from './user.repository';

function DynamicJwtModule(): DynamicModule {
  return JwtModule.registerAsync({
    inject: [ConfigService],
    useFactory: (configService: ConfigService): JwtModuleOptions => {
      const { JWT_SECRET, JWT_EXPIRATION } = configService.read();
      return {
        secret: JWT_SECRET,
        signOptions: { expiresIn: JWT_EXPIRATION },
      };
    },
  });
}

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    DynamicJwtModule(),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    {
      provide: APP_FILTER,
      useClass: AuthBadRequestExceptionFilter,
    },
  ],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
