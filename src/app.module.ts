import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MicroserviceClientModule } from './modules/microservice-client.module';
import { RedirectModule } from './modules/redirect.module';
import { AuthModule } from './modules/auth.module';

@Module({
  imports: [
    RedirectModule,
    MicroserviceClientModule,
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
