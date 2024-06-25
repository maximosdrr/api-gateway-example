import { Resource } from './resource';

export abstract class MicroserviceClient {
  abstract get host(): string;
  abstract resources: Resource[];

  getResourceByName(name: string): Resource {
    return this.resources.find((resource) => resource.name === name);
  }
}
