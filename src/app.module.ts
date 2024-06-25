import { Module } from '@nestjs/common';
import { RedirectModule } from './redirect/redirect.module';
import { ConfigModule } from '@nestjs/config';
import { MicroserviceClientModule } from './modules/microservice-client.module';

@Module({
  imports: [
    RedirectModule,
    MicroserviceClientModule,
    RedirectModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
