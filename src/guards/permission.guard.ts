import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

import { CompanyResources, User, mockUser } from './mock';
import { MicroserviceClientService } from 'src/services/microservice-client.service';
import { Resource } from 'src/interfaces/resource';
import { PermissionsEnum } from 'src/interfaces/permissions';

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
    const resourceName = request.params.resource;

    const client = this.microserviceClientService.pickClientByHost(host);
    const resource = client.getResourceByName(resourceName);

    const companyId = Number(request.headers['x-company']);
    const company = this.getUserCompanyResources(user, companyId);

    const method = request.method;

    this.verifyResourcePermission(company, resource, method);

    return true;
  }

  private getUserCompanyResources(user: User, companyId: number) {
    const result = user.companies.find((c) => c.companyId === companyId);

    if (!result) {
      throw new UnauthorizedException('Cannot access this company');
    }

    return result;
  }

  private verifyResourcePermission(
    company: CompanyResources,
    resource: Resource,
    method: string,
  ) {
    const permission = this.getPermissionByMethod(method);

    const targetResource = company.resources.find(
      (r) => r.name === resource.name,
    );

    if (!targetResource) {
      throw new UnauthorizedException('Cannot access this resource');
    }

    const hasPermission = targetResource.permissions.includes(permission);

    if (!hasPermission) {
      throw new UnauthorizedException('Permission denied');
    }
  }

  private getPermissionByMethod(method: string) {
    const map = {
      GET: PermissionsEnum.READ,
      POST: PermissionsEnum.CREATE,
      PUT: PermissionsEnum.UPDATE,
      DELETE: PermissionsEnum.DELETE,
      PATCH: PermissionsEnum.UPDATE,
    };

    if (!map[method]) throw new UnauthorizedException('Method not allowed');

    return map[method];
  }
}
