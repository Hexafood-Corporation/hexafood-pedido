import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { CreatePagamentoUseCase } from 'src/pagamento/core/application/usecases/pagamento/create.pagamento.usecase';
import { IQueueService } from '../../queue/queue.service';
import { PedidoRecebidoEvent } from 'src/pedido/core/application/events/pedido-recebido.event';

@Injectable()
export class PedidoRecebidoListener {
  constructor(
    private createPagamentoUseCase: CreatePagamentoUseCase,
    @Inject('IQueueService')
    private queueService: IQueueService
  ) { }

  @OnEvent('pedido.recebido')
  async handle(event: PedidoRecebidoEvent) {
    const pedido = event.pedido;

    const pedidoMessageDto = {
      id: pedido.id,
      codigo_pedido: pedido.codigo_pedido,
      valor_total: pedido.valor_total,
      status: pedido.status,
      itens: pedido.itens.map((item) => {
        return {
          id: item.id,
          quantidade: item.quantidade,
          valor: item.valor,
          produto: {id: item.produto.id, nome: item.produto.nome}
        };
      }),
      cliente: null,
    };

    if (pedido.cliente) {
      pedidoMessageDto.cliente = {
        id: pedido.cliente.id,
        nome: pedido.cliente.nome,
        cpf: pedido.cliente.cpf,
      };
    }

    return this.queueService.sendMessage(
      process.env.AWS_SQS_PEDIDO_RECEBIDO_QUEUE_NAME,
      JSON.stringify(pedidoMessageDto)
    );

  }
}
