import { PermissionsEnum } from 'src/interfaces/permissions';
import { Resource } from 'src/interfaces/resource';

export const mockUser: User = {
  id: 1,
  name: 'John Doe',
  email: '',
  companies: [
    {
      companyId: 1,
      resources: [
        {
          name: 'transactions',
          permissions: [PermissionsEnum.CREATE, PermissionsEnum.READ],
        },
      ],
    },
  ],
};

export interface CompanyResources {
  companyId: number;
  resources: Resource[];
}

export interface User {
  id: number;
  name: string;
  email: string;
  companies: CompanyResources[];
}
