import { Module } from '@nestjs/common';
import { RedirectController } from './redirect.controller';
import { MicroserviceClientModule } from 'src/modules/microservice-client.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [RedirectController],
  imports: [MicroserviceClientModule, HttpModule],
})
export class RedirectModule {}
