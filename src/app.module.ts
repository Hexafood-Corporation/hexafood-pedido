import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PedidoModule } from './pedido/pedido.module';
import { IdentificacaoModule } from './identificacao/identificacao.module';
import { PagamentoModule } from './pagamento/pagamento.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { HeadersInterceptor } from './interceptor/headers.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EventEmitterModule.forRoot(),
    IdentificacaoModule,
    PedidoModule,
    PagamentoModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: HeadersInterceptor,
    },
  ],
})
export class AppModule {}
