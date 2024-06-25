import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

import { CompanyResources, User, mockUser } from '../mock';
import { MicroserviceClientService } from 'src/services/microservice-client.service';
import { Resource } from 'src/interfaces/resource';
import { PermissionsEnum } from 'src/interfaces/permissions';
import { SystemResourcesByMicroservices } from 'src/constants';

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
    const resources = this.getAvailableResourcePermissions(company);

    if (!resources.length) {
      throw new UnauthorizedException('No available resources');
    }

    const targetResource = resources.find((r) => r.name === resource.name);
    const hasPermission = targetResource.permissions.includes(permission);

    if (!hasPermission) {
      throw new UnauthorizedException('Permission denied');
    }
  }

  private getAvailableResourcePermissions(
    company: CompanyResources,
  ): Resource[] {
    if (company.excludedResourcePermissions === '*') {
      return this.includePermissions(company.includedResourcePermissions);
    }

    const includedPermissions = this.includePermissions(
      company.includedResourcePermissions,
    );

    return this.excludePermissions(
      company.excludedResourcePermissions,
      includedPermissions,
    );
  }

  private excludePermissions(
    excludedResourcePermissions: Resource[] | string,
    availableResourcePermission: Resource[],
  ) {
    if (excludedResourcePermissions === '*') {
      availableResourcePermission = availableResourcePermission.map((r) => ({
        ...r,
        permissions: [],
      }));
    }

    if (Array.isArray(excludedResourcePermissions)) {
      availableResourcePermission = availableResourcePermission.map((r) => {
        const excludedResource = (
          excludedResourcePermissions as Resource[]
        ).find((er) => er.name === r.name);
        if (!excludedResource) return r;

        return {
          ...r,
          permissions: r.permissions.filter(
            (p) => !excludedResource.permissions.includes(p),
          ),
        };
      });
    }

    return availableResourcePermission;
  }

  private includePermissions(includedResourcePermissions: Resource[] | string) {
    let availableResourcePermission: Resource[] = [];

    if (includedResourcePermissions === '*') {
      availableResourcePermission = [
        ...Object.values(SystemResourcesByMicroservices).flat(),
      ];
    }

    if (Array.isArray(includedResourcePermissions)) {
      availableResourcePermission.push(
        ...(includedResourcePermissions as Resource[]),
      );
    }

    return availableResourcePermission;
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
