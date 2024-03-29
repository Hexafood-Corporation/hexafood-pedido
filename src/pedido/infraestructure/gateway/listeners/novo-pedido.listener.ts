import { Inject, Injectable } from '@nestjs/common';
import { NovoPedidoEvent } from '../../../core/application/events/novo-pedido.event';
import { OnEvent } from '@nestjs/event-emitter';
import { CreatePagamentoUseCase } from 'src/pagamento/core/application/usecases/pagamento/create.pagamento.usecase';
import { IQueueService } from '../../queue/queue.service';
import { StatusPedido } from 'src/pedido/core/domain/enum/status-pedido.enum';
import EventEmitter from 'events';
import { NotificarPedidoCanceladoUseCase } from 'src/pedido/core/application/usecases/pedidoUseCase/notificar.pedido.cancelado.usecase';
import { IPedidosRepository } from 'src/pedido/core/domain/repository/pedidos.repository';

@Injectable()
export class NovoPedidoListener {
  constructor(
    private notificarPedidoCanceladoUseCase : NotificarPedidoCanceladoUseCase,
    @Inject('IQueueService')
    private queueService: IQueueService,
    @Inject('EventEmitter')
    private eventEmitter: EventEmitter,
    @Inject('IPedidosRepository')
    private pedidoRepository: IPedidosRepository,
  ) { }

  @OnEvent('novo.pedido')
  async handle(event: NovoPedidoEvent) {
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

     await this.queueService.sendMessage(
      process.env.AWS_SQS_NOVO_PEDIDO_QUEUE_NAME,
      JSON.stringify(pedidoMessageDto),
      async (error) => {
          console.error("Falha ao enviar a mensagem:", error);
          pedido.status = StatusPedido.CANCELADO;

          try {
            await this.pedidoRepository.update(pedido.id, pedido);
            await this.notificarPedidoCanceladoUseCase.execute(pedido);
          } catch (error) {
            console.error("Falha ao atualizar o pedido:", error);
          }

      }
  );
    

  }
}
