import { Inject, Injectable } from '@nestjs/common';
import { NovoPedidoEvent } from '../../../core/application/events/novo-pedido.event';
import { OnEvent } from '@nestjs/event-emitter';
import { StatusPedido } from '../../../core/domain/enum/status-pedido.enum';
import { CreatePagamentoUseCase } from 'src/pagamento/core/application/usecases/pagamento/create.pagamento.usecase';
import { UpdatePedidoUseCase } from 'src/pedido/core/application/usecases/pedidoUseCase/update.pedido.usecase';
import { SqsQueueService } from '../sqs/sqs-queue.service';
import { IQueueService } from '../../queue/queue.service';

@Injectable()
export class NovoPedidoListener {
  constructor(
    private createPagamentoUseCase: CreatePagamentoUseCase,
    @Inject('IQueueService')
    private queueService: IQueueService
  ) { }

  @OnEvent('novo.pedido')
  async handle(event: NovoPedidoEvent) {
    const pedido = event.pedido;

    console.log(pedido);

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
      process.env.AWS_SQS_NOVO_PEDIDO_QUEUE_NAME,
      JSON.stringify(pedidoMessageDto)
    );

  }
}
