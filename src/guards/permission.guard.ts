import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

import { User, mockUser } from './mock';
import { MicroserviceClientService } from 'src/services/microservice-client.service';

@Injectable()
export class PermissionAuthGuard implements CanActivate {
  constructor(
    private readonly microserviceClientService: MicroserviceClientService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    // const bearerToken = request.headers['authorization'];

    // const token = bearerToken.split(' ')[1];

    // const decodedUser = await this.jwtService.decode(token);

    // if (!decodedUser) {
    //   throw new UnauthorizedException();
    // }
    const user = mockUser;

    const host = request.params.host;

    const company = Number(request.headers['x-company']);

    this.verifyUserCompanyAccess(user, company);

    const client = this.microserviceClientService.pickClientByHost(host);

    const resourceName = request.params.resource;

    const resource = client.getResourceByName(resourceName);

    if (!resource) {
      throw new UnauthorizedException('Resource not found');
    }

    this.verifyUserResourceAccess(user, resourceName);

    const routePath = request.params.path ?? '/';
    const method = request.method;

    this.verifyUserRouteAccess(user, routePath, method);

    return true;
  }

  private verifyUserCompanyAccess(user: User, company: number) {
    const result = user.permissions.some(
      (permission) => permission.companyId === company,
    );

    if (!result) {
      throw new UnauthorizedException('Cannot access this company');
    }
  }

  private verifyUserResourceAccess(user: User, resource: string) {
    const result = user.permissions.some(
      (permission) => permission.resource === resource,
    );

    if (!result) {
      throw new UnauthorizedException('Cannot access this resource');
    }
  }

  private verifyUserRouteAccess(user: User, routePath: string, method: string) {
    const isWildCard = (value: string) => value === '*' || value === 'ALL';

    for (const permission of user.permissions) {
      if (isWildCard(permission.route) && isWildCard(permission.routeMethod)) {
        return;
      }

      if (isWildCard(permission.route) && permission.routeMethod === method) {
        return;
      }

      if (
        permission.route === routePath &&
        isWildCard(permission.routeMethod)
      ) {
        return;
      }

      if (permission.route === routePath && permission.routeMethod === method) {
        return;
      }

      throw new UnauthorizedException('Cannot access this route');
    }
  }
}
