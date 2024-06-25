import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resource } from 'src/interfaces/resource';
import { MicroserviceClient } from 'src/interfaces/client';
import { SystemResourcesByMicroservices } from 'src/constants';

@Injectable()
export class TransactionMicroserviceClient extends MicroserviceClient {
  resources: Resource[] = SystemResourcesByMicroservices.transactions;

  constructor(private readonly configService: ConfigService) {
    super();
  }

  get host() {
    return this.configService.get('TRANSACTION_HOST');
  }
}
