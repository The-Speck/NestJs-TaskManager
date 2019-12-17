import { DynamicModule, Module } from '@nestjs/common';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '../config/config.service';
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
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
