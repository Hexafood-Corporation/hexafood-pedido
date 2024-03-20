import { OnEvent } from '@nestjs/event-emitter';
import { NotificarPedidoCanceladoUseCase } from "src/pedido/core/application/usecases/pedidoUseCase/notificar.pedido.cancelado.usecase";
import { Pedido } from "src/pedido/core/domain/entity/pedido.entity";

export class PedidoCanceladoListener {
  constructor(
    private notificarPedidoCanceladoUseCase: NotificarPedidoCanceladoUseCase
  ) {}

  @OnEvent('pedido.cancelado')
  async handle(event: Pedido) {

    console.log("notificarPedidoCanceladoUseCase", this.notificarPedidoCanceladoUseCase);

    await this.notificarPedidoCanceladoUseCase.execute(event);
  }
}