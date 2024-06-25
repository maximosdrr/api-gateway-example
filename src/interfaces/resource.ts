import { PermissionsEnum } from './permissions';

export class Resource {
  name: string;
  permissions: PermissionsEnum[];

  constructor(data: { name: string; permissions: PermissionsEnum[] }) {
    Object.assign(this, data);
  }
}
