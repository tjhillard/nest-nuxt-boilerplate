import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class RolesGuard implements CanActivate {
  private policy: any;

  constructor(policy: any) {
    this.policy = policy;
  }

  canActivate(context: ExecutionContext): boolean {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();

    // Does the policy class define a rule for the method?
    if (this.policy[context.getHandler().name]) {
      return this.policy[context.getHandler().name](request.user);
    }

    // Does the policy class define a rule for the controller?
    if (this.policy.all) {
      return this.policy.all(request.user);
    }

    return false;
  }
}
