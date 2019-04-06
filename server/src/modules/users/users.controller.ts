import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express';

import { AuthGuard } from 'src/shared/application/guards/auth.guard';
import { RolesGuard } from 'src/shared/application/guards/roles.guard';

import { UsersService } from './users.service';
import { UserResponseObject } from './user.dto';
import { UsersPolicy } from './users.policy';

@Controller('users')
@UseGuards(new AuthGuard(), new RolesGuard(new UsersPolicy()))
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Get()
  async index(@Req() req: Request): Promise<UserResponseObject[]> {
    return await this.usersService.index(req);
  }

  @Get('/:id')
  async read(@Req() req: Request): Promise<UserResponseObject> {
    return await this.usersService.read(req);
  }
}
