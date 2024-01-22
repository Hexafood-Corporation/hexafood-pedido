import { Inject } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { PagamentoProcessadoEvent } from "src/pedido/core/application/events/pagamento-processado.event";
import { UpdatePedidoUseCase } from "src/pedido/core/application/usecases/pedidoUseCase/update.pedido.usecase";
import { StatusPedido } from "src/pedido/core/domain/enum/status-pedido.enum";
import { IPedidosRepository } from "src/pedido/core/domain/repository/pedidos.repository";

export class PagamentoProcessadoListener{
    constructor(
        private readonly updatePedidoUseCase: UpdatePedidoUseCase,
        @Inject('IPedidosRepository')
        private pedidosRepository: IPedidosRepository,
        ){}

    @OnEvent('pagamento.processado')
    async handle(event: PagamentoProcessadoEvent){
        const pagamento = event.pagamento;

        const pedido = await this.pedidosRepository.findById(pagamento.id_pedido);

        if(pagamento.status.toLowerCase() != 'aprovado'){
            pedido.status = StatusPedido.CANCELADO;
        }
        else{
            pedido.status = StatusPedido.RECEBIDO;
        }

        await this.updatePedidoUseCase.execute(pedido);
    }
}