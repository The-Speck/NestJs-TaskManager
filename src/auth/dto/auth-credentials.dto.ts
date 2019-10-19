import { IsNotEmpty } from 'class-validator';
import { IsValidPassword } from '../../validators/isValidPassword';

export class AuthCredentialsDto {
  @IsNotEmpty()
  username: string;

  @IsValidPassword({}, { message: 'Invalid Password' })
  password: string;
}
