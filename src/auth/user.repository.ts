import {
  ConflictException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  private readonly logger = new Logger(UserRepository.name);

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const user = new User();
    user.username = username;
    user.password = await this.hashPassword(password);

    try {
      await user.save();
    } catch (error) {
      // TODO: Create an error handler
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException(error);
      }
    }

    this.logger.log(`Successfully created new user ${user.username}`);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<string | null> {
    const { username, password } = authCredentialsDto;
    const user = await this.findOne({ username });

    if (user && user.isValidPassword(password)) {
      return user.username;
    } else {
      return null;
    }
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }
}
