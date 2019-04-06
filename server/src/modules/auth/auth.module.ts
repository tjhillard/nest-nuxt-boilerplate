import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserEntity } from 'src/modules/users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity], 'app_connection')],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
