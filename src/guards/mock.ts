export const mockUser = {
  id: 1,
  name: 'John Doe',
  email: '',
  permissions: [
    {
      companyId: 1,
      resource: 'transactions',
      route: '*', //ANY ROUTE HERE EX: /transactions/:id
      routeMethod: '*', //GET, POST, PUT, PATCH, DELETE
    },
    {
      companyId: 1,
      resource: 'default',
      route: '*', //ANY ROUTE HERE EX: /transactions/:id
      routeMethod: '*', //GET, POST, PUT, PATCH, DELETE
    },
  ],
};

export interface Permission {
  companyId: number;
  resource: string;
  route: string;
  routeMethod: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  permissions: Permission[];
}
