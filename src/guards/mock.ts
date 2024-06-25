import { PermissionsEnum } from 'src/interfaces/permissions';
import { Resource } from 'src/interfaces/resource';

export const mockUser: User = {
  id: 1,
  name: 'John Doe',
  email: '',
  companies: [
    {
      companyId: 1,
      includedResourcePermissions: '*',
      excludedResourcePermissions: [
        {
          name: 'transactions',
          permissions: [PermissionsEnum.CREATE],
        },
      ],
    },
  ],
};

export interface CompanyResources {
  companyId: number;
  includedResourcePermissions: Resource[] | string;
  excludedResourcePermissions: Resource[] | string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  companies: CompanyResources[];
}
