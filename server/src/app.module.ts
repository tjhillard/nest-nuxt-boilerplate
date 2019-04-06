import 'dotenv/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';

// Auth
import { AuthModule } from './modules/auth/auth.module';
import { AuthController } from './modules/auth/auth.controller';
import { AuthService } from './modules/auth/auth.service';

// Users
import { UsersController } from './modules/users/users.controller';
import { UsersService } from './modules/users/users.service';
import { UserEntity } from './modules/users/user.entity';

@Module({
  imports: [
    AuthModule,
    AppModule,
    TypeOrmModule.forRoot({
      name: 'app_connection',
      keepConnectionAlive: true,
      type: 'postgres',
      url: process.env.DATABASE_URL,
      logging: true,
      synchronize: process.env.NODE_ENV !== 'production',
      entities: [
        UserEntity,
      ],
    }),
  ],
  controllers: [
    AppController,
    AuthController,
    UsersController,
  ],
  providers: [
    AuthService,
    UsersService,
  ],
})
export class AppModule {}
