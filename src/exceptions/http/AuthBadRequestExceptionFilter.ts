import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { Response } from 'express';
import { AuthCredentialsDto } from '../../auth/dto/auth-credentials.dto';

@Catch(BadRequestException)
export class AuthBadRequestExceptionFilter implements ExceptionFilter {
  private static readonly PASSWORD_TEXT: string = 'password';
  private static readonly PASSWORD_CENSORED = '******';

  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    this.hidePasswordIfExists(exception);

    response.status(status).json(exception.getResponse());
  }

  private hidePasswordIfExists(exception: BadRequestException) {
    const message: ValidationError = this.findPasswordMessage(exception);

    if (message) {
      this.hidePassword(message);
    }
  }

  private hidePassword(message: ValidationError) {
    message.value = AuthBadRequestExceptionFilter.PASSWORD_CENSORED;
    const authCredentialsDto: AuthCredentialsDto = message.target as AuthCredentialsDto;
    authCredentialsDto.password =
      AuthBadRequestExceptionFilter.PASSWORD_CENSORED;
  }

  private findPasswordMessage(exception: BadRequestException): ValidationError {
    const jsonResponse: any = exception.getResponse();
    return jsonResponse.message.find(
      (m: ValidationError) =>
        m.property === AuthBadRequestExceptionFilter.PASSWORD_TEXT,
    );
  }
}

export default AuthBadRequestExceptionFilter;
