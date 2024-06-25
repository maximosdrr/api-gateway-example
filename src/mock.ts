import { PermissionsEnum } from 'src/interfaces/permissions';
import { Resource } from 'src/interfaces/resource';

export const mockUser: User = {
  id: 1,
  name: 'John Doe',
  email: '',
  companies: [
    {
      companyId: 1,
      role: 'custom',
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
  role: 'admin' | 'operator' | 'supervisor' | 'custom';
  includedResourcePermissions: Resource[] | string;
  excludedResourcePermissions: Resource[] | string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  companies: CompanyResources[];
}

export const JWT_SECRET = 'MY_SUPER_SECRET';
export const JWT_REFRESH_SECRET = 'MY_SUPER_REFRESH_SECRET';
