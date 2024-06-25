import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resource } from 'src/interfaces/resource';
import { MicroserviceClient } from 'src/interfaces/client';

@Injectable()
export class TransactionMicroserviceClient extends MicroserviceClient {
  constructor(private readonly configService: ConfigService) {
    super();
  }

  get host() {
    return this.configService.get('TRANSACTION_HOST');
  }

  resources: Resource[] = [
    new Resource({
      name: 'transactions',
      path: '/transactions',
    }),
  ];
}
