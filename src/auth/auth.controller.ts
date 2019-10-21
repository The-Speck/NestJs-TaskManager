import {
  Body,
  Controller,
  Post,
  UseFilters,
  ValidationPipe,
} from '@nestjs/common';
import AuthBadRequestExceptionFilter from '../exceptions/http/AuthBadRequestExceptionFilter';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @UseFilters(AuthBadRequestExceptionFilter)
  async signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }
}
