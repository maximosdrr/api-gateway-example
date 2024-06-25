import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MicroserviceClientModule } from './modules/microservice-client.module';
import { RedirectModule } from './modules/redirect.module';

@Module({
  imports: [
    RedirectModule,
    MicroserviceClientModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
