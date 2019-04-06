import 'dotenv/config';
import * as bcrypt from 'bcryptjs';
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, UpdateDateColumn, BeforeInsert, Index } from 'typeorm';

import { JwtService } from 'src/shared/application/services/jwt-service';
import { ICrudableEntity } from 'src/shared/application/services/crud-service/interfaces/crudable-entity.interface';

import { UserResponseObject } from './user.dto';

@Entity('users')
export class UserEntity implements ICrudableEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'text',
    unique: true,
  })
  @Index()
  email: string;

  @Column('text')
  @Index()
  password: string;

  @Column({ default: 0 })
  role: number;

  @CreateDateColumn()
  'created_at': Date;

  @UpdateDateColumn()
  'updated_at': Date;

  @Column({ default: null })
  @Index()
  'deleted_at': Date;

  @Column({ default: false })
  disabled: boolean;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  serialize(options: { includeToken?: boolean; } = { includeToken: false }): UserResponseObject {
    const { id, email, role, token, created_at, updated_at, deleted_at } = this;
    const serializedUser: UserResponseObject = { id, email, role, created_at, updated_at, deleted_at };
    if (options.includeToken) { serializedUser.token = token; }
    return serializedUser;
  }

  async comparePassword(given: string) {
    return await bcrypt.compare(given, this.password);
  }

  private get token() {
    const { id, disabled, role } = this;
    return JwtService.sign({ id, disabled, role });
  }
}
