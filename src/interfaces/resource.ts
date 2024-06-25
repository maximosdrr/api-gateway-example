import { PermissionsEnum } from './permissions';

export class Resource {
  name: string;
  permissions: PermissionsEnum[];

  constructor(data: { name: string; path: string }) {
    Object.assign(this, data);
  }
}
