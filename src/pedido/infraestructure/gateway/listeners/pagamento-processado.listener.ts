import { Inject } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import EventEmitter from "events";
import { PagamentoProcessadoEvent } from "src/pedido/core/application/events/pagamento-processado.event";
import { PedidoRecebidoEvent } from "src/pedido/core/application/events/pedido-recebido.event";
import { UpdatePedidoUseCase } from "src/pedido/core/application/usecases/pedidoUseCase/update.pedido.usecase";
import { StatusPedido } from "src/pedido/core/domain/enum/status-pedido.enum";
import { IPedidosRepository } from "src/pedido/core/domain/repository/pedidos.repository";

export class PagamentoProcessadoListener {
    constructor(
        private readonly updatePedidoUseCase: UpdatePedidoUseCase,
        @Inject('IPedidosRepository')
        private pedidosRepository: IPedidosRepository,
        @Inject('EventEmitter')
        private eventEmitter: EventEmitter,
    ) { }

    @OnEvent('pagamento.processado')
    async handle(event: PagamentoProcessadoEvent) {
        const pagamento = event.pagamento;

        const pedido = await this.pedidosRepository.findById(pagamento.id_pedido);

        if (pagamento.status.toLowerCase() != 'aprovado') {
            pedido.status = StatusPedido.CANCELADO;
        }
        else {
            pedido.status = StatusPedido.RECEBIDO;
        }

        try {
            await this.updatePedidoUseCase.execute(pedido);
            if (pedido.status == StatusPedido.RECEBIDO) {
                this.eventEmitter.emit('pedido.recebido', new PedidoRecebidoEvent(pedido));
            }
        } catch (error) {
            console.log(error);
        }
    }
}