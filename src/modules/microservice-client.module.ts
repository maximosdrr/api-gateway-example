import { Module, Provider } from '@nestjs/common';
import { TransactionMicroserviceClient } from 'src/clients/transaction.client';
import { MicroserviceClientService } from 'src/services/microservice-client.service';

const providers: Provider[] = [
  TransactionMicroserviceClient,
  MicroserviceClientService,
];

@Module({
  providers: [...providers],
  exports: [...providers],
})
export class MicroserviceClientModule {}
