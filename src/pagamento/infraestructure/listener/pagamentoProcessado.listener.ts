import { OnEvent } from '@nestjs/event-emitter';
import { UpdatePagamentoUseCase } from 'src/pagamento/core/application/usecases/pagamento/update.pagamento.usecase';
import { CreatePagamentoDto } from 'src/pagamento/core/application/usecases/pagamento/pagamentoDto';
import { PagamentoProcessadoDto } from 'src/pedido/core/application/events/pagamento-processado.event';

export class PagamentoProcessado {
  constructor(
    private updatePagamentoUseCase: UpdatePagamentoUseCase,
  ) {}

  @OnEvent('pagamento.processado')
  async handle(event: PagamentoProcessadoDto) {

    const {status, id_pedido, id_pagamento} = event;
    const pagamento = await this.updatePagamentoUseCase.execute(
      {
        id: id_pagamento,
        status: status,
        codigo_pedido: id_pedido
      }
    );

    return pagamento
  }

}