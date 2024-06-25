import { BadRequestException } from '@nestjs/common';
import { Resource } from './resource';

export abstract class MicroserviceClient {
  abstract get host(): string;
  abstract resources: Resource[];

  getResourceByName(name: string): Resource {
    const resource = this.resources.find((resource) => resource.name === name);

    if (!resource) {
      throw new BadRequestException('Resource not found');
    }

    return resource;
  }
}
