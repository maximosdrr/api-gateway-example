import { Injectable } from '@nestjs/common';
import { TransactionMicroserviceClient } from 'src/clients/transaction.client';
import { MicroserviceClientsEnum } from 'src/constants';
import { MicroserviceClient } from 'src/interfaces/client';

@Injectable()
export class MicroserviceClientService {
  constructor(
    private readonly transactionClient: TransactionMicroserviceClient,
  ) {}

  private readonly hostMap = {
    [MicroserviceClientsEnum.TRANSACTION]: this.transactionClient,
  };

  pickClientByHost(host: string): MicroserviceClient {
    return this.hostMap[host];
  }
}
