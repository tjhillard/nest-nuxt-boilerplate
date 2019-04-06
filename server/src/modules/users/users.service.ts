import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { UserEntity } from './user.entity';
import { CrudService } from 'src/shared/application/services/crud-service/crud.service';

@Injectable()
export class UsersService extends CrudService {
  constructor(
    @InjectRepository(UserEntity)
    userRepository: Repository<UserEntity>,
  ) {
    super(userRepository);
  }
}
