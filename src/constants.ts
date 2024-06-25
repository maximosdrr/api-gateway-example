import { PermissionsEnum } from './interfaces/permissions';
import { Resource } from './interfaces/resource';

export enum MicroserviceClientsEnum {
  TRANSACTION = 'transaction',
}

export const SystemResourcesByMicroservices = {
  transactions: [
    new Resource({
      name: 'transactions',
      permissions: [
        PermissionsEnum.CREATE,
        PermissionsEnum.READ,
        PermissionsEnum.UPDATE,
        PermissionsEnum.DELETE,
      ],
    }),
  ],
};
