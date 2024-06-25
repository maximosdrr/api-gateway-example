import { Module } from '@nestjs/common';
import { MicroserviceClientModule } from 'src/modules/microservice-client.module';
import { HttpModule } from '@nestjs/axios';
import { RedirectController } from 'src/controllers/redirect.controller';

@Module({
  controllers: [RedirectController],
  imports: [MicroserviceClientModule, HttpModule],
})
export class RedirectModule {}
