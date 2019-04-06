import 'dotenv/config';

import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { verify } from 'jsonwebtoken';

import { AuthDto } from './auth.dto';
import { UserResponseObject } from 'src/modules/users/user.dto';
import { UserEntity } from 'src/modules/users/user.entity';
import { JwtService } from 'src/shared/application/services/jwt-service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  /**
   * @description Registers a new user
   */
  async register(data: AuthDto): Promise<UserResponseObject> {
    const { email } = data;
    const userWithEmail: UserEntity = await this.userRepository.findOne({ where: { email } });

    if (userWithEmail) {
      throw new HttpException('User with provided email already exists', HttpStatus.BAD_REQUEST);
    }

    const newUser = await this.userRepository.create(data);
    this.userRepository.save(newUser);
    return newUser.serialize({ includeToken: true });
  }

  /**
   *
   * @description Logs in an existing user
   */
  async login(data: AuthDto): Promise<UserResponseObject> {
    const { email, password } = data;
    const user: UserEntity = await this.userRepository.findOne({ where: { email } });

    if (!user || !(await user.comparePassword(password))) {
      throw new HttpException('Invalid email/password combination', HttpStatus.BAD_REQUEST);
    }
    return user.serialize({ includeToken: true });
  }

  /**
   *
   * @description Returns the user object for given token
   */
  async me(token) {
    const jwt = token.split(' ')[1];
    try {
      const payload: any = await verify(jwt, process.env.JWT_SECRET);
      const user: UserEntity = await this.userRepository.findOne(payload.id);

      if (user.disabled) { throw new Error(); }
      return user.serialize();

    } catch (err) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }

  /**
   *
   * @description Returns a new access token based on a vali, but expired one
   */
  async getNewAccessToken(oldToken: string) {
    const jwt = oldToken.split(' ')[1];
    try {
      const payload: any = await verify(jwt, process.env.JWT_SECRET, { ignoreExpiration: true });
      const user: UserEntity = await this.userRepository.findOne(payload.id);
      const { id, disabled, role } = user;

      if (disabled) { throw new Error(); }
      return {
        token: JwtService.sign({ id, disabled, role }),
      };
    } catch (err) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }
}
