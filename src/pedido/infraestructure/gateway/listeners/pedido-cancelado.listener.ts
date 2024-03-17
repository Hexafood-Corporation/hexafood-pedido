import { OnEvent } from '@nestjs/event-emitter';
import { NotificarPedidoCanceladoUseCase } from "src/pedido/core/application/usecases/pedidoUseCase/notificar.pedido.cancelado.usecase";
import { Pedido } from "src/pedido/core/domain/entity/pedido.entity";

export class PedidoCanceladoListener {
  constructor(
    private readonly notificarPedidoCanceladoUseCase: NotificarPedidoCanceladoUseCase
  ) {}

  @OnEvent('pedido.cancelado')
  async handle(event: Pedido) {
    await this.notificarPedidoCanceladoUseCase.execute(event);
  }
}