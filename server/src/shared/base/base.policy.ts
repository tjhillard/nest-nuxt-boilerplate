import { UserEntity } from 'src/modules/users/user.entity';
import { RolesService } from '../application/services/roles-service';

export class BasePolicy {
  isSuperAdmin(user: Partial<UserEntity>) {
    return RolesService.parse(user.role) === 'superadmin';
  }

  isAdmin(user: Partial<UserEntity>) {
    return RolesService.parse(user.role) === 'admin';
  }

  isInternal(user: Partial<UserEntity>) {
    return RolesService.parse(user.role) === 'internal';
  }
}
