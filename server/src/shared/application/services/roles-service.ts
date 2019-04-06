export class RolesService {
  static parse(role: number) {
    if (role === 0) { return 'user'; }
    if (role === 1) { return 'superadmin'; }
    if (role === 2) { return 'admin'; }
    if (role === 4) { return 'internal'; }
  }

  static isInternalRole(role: number) {
    return role > 0;
  }
}
